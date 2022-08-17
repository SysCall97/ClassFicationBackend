import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const assignmentSchema = new mongoose.Schema({
    classCode: {
        type: String,
        trim: true,
        required: true
    },
    assignmentCode: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('assignment', assignmentSchema);