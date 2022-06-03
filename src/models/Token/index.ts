import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dumpedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    signedOutAt: {
        type: Date,
        default: Date.now()
    },
    expire_at: {type: Date, default: Date.now, expires: 7200} 
});

export default mongoose.model('dumpedToken', dumpedTokenSchema);