const express = require('express');

const {getNotifications, markNotificationsRead} = require("../controller/notificationController") 

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

//getting all notifications
router.get('/notifications', getNotifications)

router.patch('/notificationCount',  markNotificationsRead);


module.exports = router;