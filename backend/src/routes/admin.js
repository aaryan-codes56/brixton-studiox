const express = require('express');
const adminController = require('../controllers/adminController');
const teamController = require('../controllers/teamController');
const authGuard = require('../middleware/auth');

const router = express.Router();

router.use(authGuard); // Protect all routes in this file

// Leads
router.get('/leads', adminController.getLeads);
router.get('/leads/export/csv', adminController.exportCSV);
router.patch('/leads/:id', adminController.patchLead);
router.post('/leads/:id/notes', adminController.addNote);

// Team Members
router.get('/team', teamController.getTeam);
router.post('/team', teamController.addMember);
router.delete('/team/:id', teamController.deleteMember);

// Temporary: One-Time System Reset
router.post('/reset-system', adminController.handleSystemReset);

module.exports = router;
