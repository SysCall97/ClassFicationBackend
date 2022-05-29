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
    commentIds: [String]
}, {
    timestamps: true
});

export default mongoose.model('post', postSchema);