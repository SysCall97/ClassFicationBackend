import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    classCode: {
        type: String,
        trim: true,
        required: true
    },
    post: {
        type: String,
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
    commentIds: [String]
}, {
    timestamps: true
});

export default mongoose.model('post', postSchema);