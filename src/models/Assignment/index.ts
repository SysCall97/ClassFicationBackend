import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'submission'
    }],
    startDate: {
        type: Date,
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