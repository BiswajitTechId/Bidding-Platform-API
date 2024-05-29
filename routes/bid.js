const express = require('express');
const bidController = require('../controllers/bidController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:itemId/bids', bidController.getBidsByItem);
router.post('/:itemId/bids', auth, bidController.placeBid);

module.exports = router;
