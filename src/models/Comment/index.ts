import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('comment', commentSchema);