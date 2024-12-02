const express = require('express');
const { sendConnectionRequest, getConnectionRequests, handleConnectionRequest, getConnections } = require('../controllers/connectionController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/request', protect, sendConnectionRequest);
router.get('/requests', protect, getConnectionRequests);
router.put('/request/:connectionId', protect, handleConnectionRequest);
router.get('/', protect, getConnections);

module.exports = router;
