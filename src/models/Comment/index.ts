import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
    classCode: {
        type: String,
        trim: true,
        required: true
    },
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
    comment: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('comment', commentSchema);