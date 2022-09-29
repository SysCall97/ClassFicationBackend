import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const submissionSchema = new mongoose.Schema({
    assignmentCode: {
        type: String,
        trim: true,
        required: true
    },
    submissionCode: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    },
    mark: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

export default mongoose.model('submission', submissionSchema);