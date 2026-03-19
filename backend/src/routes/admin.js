const express = require('express');
const adminController = require('../controllers/adminController');
const authGuard = require('../middleware/auth');

const router = express.Router();

router.use(authGuard); // Protect all routes in this file

router.get('/leads', adminController.getLeads);
router.get('/leads/export/csv', adminController.exportCSV);
router.patch('/leads/:id', adminController.patchLead);
router.post('/leads/:id/notes', adminController.addNote);

module.exports = router;
