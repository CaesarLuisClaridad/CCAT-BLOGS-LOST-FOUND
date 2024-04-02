const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Blogs', blogSchema);