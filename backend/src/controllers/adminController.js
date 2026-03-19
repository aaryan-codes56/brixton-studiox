const { updateLead: updateSheetLead, clearSheet } = require('../services/sheets');
const leadsService = require('../services/leadsService');
const teamService = require('../services/teamService');

const VALID_STATUSES = ['open', 'contacted', 'in_progress', 'won', 'lost'];

exports.getLeads = async (req, res) => {
  try {
    const leads = await leadsService.getLeads();
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};

exports.patchLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment, assignedTo } = req.body;

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    // Update locally (Primary)
    const updated = await leadsService.updateLead(id, { status, comment, assignedTo });

    // Sync to Google Sheets (Secondary, non-blocking)
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY?.includes('BEGIN PRIVATE KEY')) {
      updateSheetLead(id, { status, comment, assignedTo }).catch(err =>
        console.error('Failed to update Google Sheet lead:', err.message)
      );
    }

    res.json({ success: true, message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const note = await leadsService.addNote(id, { text: text.trim(), author: author || 'Admin' });
    res.json({ success: true, note });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to add note' });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const leads = await leadsService.getLeads();

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
    res.status(500).json({ success: false, message: 'Failed to export CSV' });
  }
};
