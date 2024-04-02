const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blogs',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
