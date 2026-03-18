const { updateLead: updateSheetLead } = require('../services/sheets');
const leadsService = require('../services/leadsService');

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

    // Update locally (Primary)
    const updated = await leadsService.updateLead(id, { status, comment, assignedTo });

    // Sync to Google Sheets (Secondary)
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
      try {
        await updateSheetLead(id, { status, comment, assignedTo });
      } catch (sheetError) {
        console.error('Failed to update Google Sheet lead:', sheetError.message);
      }
    }

    res.json({ success: true, message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
};
