const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/sepayController');

router.post('/webhook', handleWebhook);

module.exports = router;
