const teamService = require('../services/teamService');

exports.getTeam = async (req, res) => {
  try {
    const team = await teamService.getTeam();
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch team' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name?.trim()) return res.status(400).json({ success: false, message: 'Name is required' });
    const member = await teamService.addMember({ name, role });
    res.status(201).json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add member' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await teamService.deleteMember(req.params.id);
    res.json({ success: true, message: 'Member removed' });
  } catch (err) {
    res.status(err.message === 'Member not found' ? 404 : 500).json({ success: false, message: err.message });
  }
};
