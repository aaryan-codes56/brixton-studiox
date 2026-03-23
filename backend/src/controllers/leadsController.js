const { appendLead } = require('../services/sheets');
const leadsService = require('../services/leadsService');
const { sendLeadNotification, sendClientConfirmation } = require('../services/emailService');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

exports.createLead = async (req, res) => {
  // 1. Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, service, message } = req.body;
    const timestamp = new Date().toISOString();

    // Generate sequential BX ID
    const id = await leadsService.generateId();

    const lead = {
      id,
      name,
      email,
      phone,
      service,
      message: message || '',
      status: 'open',
      comment: '',
      assignedTo: '',
      notes: [],
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Store locally (Primary)
    await leadsService.saveLead(lead);

    // Vercel Serverless freezes all execution the millisecond res.json() is called.
    // We MUST await all background processes in parallel before responding.
    const backgroundTasks = [];

    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY?.includes('BEGIN PRIVATE KEY')) {
      backgroundTasks.push(appendLead(lead).catch(err => console.error('Failed to sync to Google Sheets:', err.message)));
    }

    backgroundTasks.push(sendLeadNotification(lead).catch(err => console.error('Failed to send admin email:', err.message)));
    backgroundTasks.push(sendClientConfirmation(lead).catch(err => console.error('Failed to send client confirmation:', err.message)));

    await Promise.all(backgroundTasks);

    res.status(201).json({ success: true, message: 'Your call request has been received!' });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting your request.' });
  }
};
