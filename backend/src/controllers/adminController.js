const { getAllLeads, updateLead } = require('../services/sheets');

exports.getLeads = async (req, res) => {
  try {
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      // Mock data for testing without sheets configured
      return res.json({ leads: [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', service: 'Reels', message: 'Lets shoot', status: 'open', comment: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', service: 'SEO', message: '', status: 'closed', comment: 'Completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ]});
    }

    const leads = await getAllLeads();
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};

exports.patchLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      return res.json({ success: true, message: 'Mock update success' });
    }

    const updated = await updateLead(id, { status, comment });
    res.json({ success: true, message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
};
