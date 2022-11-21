import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sessionSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    },
    classCode: {
        type: String,
        trim: true,
        required: true
    },
    sessionCode: {
        type: String,
        trim: true,
        required: true
    },
    finalAttendee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    attendee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    startDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('session', sessionSchema);