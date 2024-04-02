const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lostandFound = new Schema({
    what: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    where: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.Mixed,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('LostAndFound', lostandFound);