const express = require('express');
const { body } = require('express-validator');
const leadsController = require('../controllers/leadsController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('service').trim().notEmpty().withMessage('Service selection is required'),
  ],
  leadsController.createLead
);

module.exports = router;
