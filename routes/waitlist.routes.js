const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlist.controller');

router.post('/', waitlistController.addToWaitlist);
router.get('/', waitlistController.getWaitlist);

module.exports = router;
