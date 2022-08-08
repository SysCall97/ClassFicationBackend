import { INVALID_EMAIL } from './../../messages/index';
import mongoose from "mongoose";
import { validateEmail } from "../../helpers";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        validate: [validateEmail, INVALID_EMAIL],
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('user', userSchema);