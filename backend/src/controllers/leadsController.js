const { appendLead } = require('../services/sheets');
const leadsService = require('../services/leadsService');
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

    const lead = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      service,
      message: message || '',
      status: 'open',
      comment: '',
      assignedTo: '',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Store locally (Primary)
    await leadsService.saveLead(lead);

    // Sync to Google Sheets (Secondary)
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
        try {
            await appendLead(lead);
        } catch (sheetError) {
            console.error('Failed to sync to Google Sheets:', sheetError.message);
        }
    }

    res.status(201).json({ success: true, message: 'Your call request has been received!' });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting your request.' });
  }
};
