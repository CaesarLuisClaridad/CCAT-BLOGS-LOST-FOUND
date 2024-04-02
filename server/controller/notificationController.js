const Notification = require("../models/notificationModel")

const getNotifications = async (req, res) => {
    console.log("getting notifications")
    console.log("User ID for notification query:", req.user._id);
    try{
        const notification = await Notification.find({toUser: req.user._id}).sort({createdAt: - 1}).populate('fromUser')
        const unreadCount = await Notification.countDocuments({toUser: req.user._id, read: false});
        res.status(200).json({notification, unreadCount});

        console.log("User ID for notification query:", req.user._id);
    }
    catch(error){
        res.status(400).json({error: "Failed to create notification"})
    }
}

const markNotificationsRead = async (req, res) => {
    try {
        await Notification.updateMany({ toUser: req.user._id, read: false }, { $set: { read: true } });
        res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        res.status(500).json({ error: "Failed to mark notifications as read" });
    }
};


module.exports = {
    getNotifications,
    markNotificationsRead,
}