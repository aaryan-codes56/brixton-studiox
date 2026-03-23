const sheets = require('../services/sheets');
const teamService = require('../services/teamService');

const VALID_STATUSES = ['open', 'contacted', 'in_progress', 'won', 'lost'];

exports.getLeads = async (req, res) => {
  try {
    let leads = [];
    if (process.env.GOOGLE_SHEET_ID) {
      leads = await sheets.getAllLeads();
    }
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads from Sheets' });
  }
};

exports.patchLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment, assignedTo } = req.body;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    let updated = { id, status, comment, assignedTo };

    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY?.includes('BEGIN PRIVATE KEY')) {
      updated = await sheets.updateLead(id, { status, comment, assignedTo });
    }

    res.json({ success: true, message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead in Sheets' });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    // Since Google Sheets doesn't have a nested Notes column array, we append notes to the central 'Comment' field.
    const leads = await sheets.getAllLeads();
    const lead = leads.find(l => l.id === id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    const newAddition = `[Note by ${author || 'Admin'}]: ${text.trim()}`;
    const updatedComment = lead.comment ? `${lead.comment}\n${newAddition}` : newAddition;

    if (process.env.GOOGLE_SHEET_ID) {
      await sheets.updateLead(id, { comment: updatedComment });
    }

    res.json({ success: true, note: { id: Date.now(), text, author: author || 'Admin', createdAt: new Date().toISOString() } });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to add note to Sheets' });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const leads = await sheets.getAllLeads();

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Comment', 'AssignedTo', 'CreatedAt', 'UpdatedAt'];

    const rows = leads.map(lead => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.service,
      (lead.message || '').replace(/"/g, '""'),
      lead.status,
      (lead.comment || '').replace(/"/g, '""'),
      lead.assignedTo || '',
      lead.createdAt,
      lead.updatedAt
    ].map(v => `"${v}"`).join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="brixton-leads-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ success: false, message: 'Failed to export CSV from Sheets' });
  }
};
