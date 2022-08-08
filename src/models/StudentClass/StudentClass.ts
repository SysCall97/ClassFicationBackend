import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const studentClassSchema = new mongoose.Schema({
    classCode: {
        type: String,
        trim: true,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('studentClass', studentClassSchema);