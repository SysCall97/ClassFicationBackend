import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const classSchema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    className: {
        type: String,
        trim: true,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    numOfStudents: {
        type:Number,
        default:1
    }
}, {
    timestamps: true
});

export default mongoose.model('class', classSchema);