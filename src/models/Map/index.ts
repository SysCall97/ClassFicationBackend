import mongoose from "mongoose";

// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mapSchema = new mongoose.Schema({
    value: {
        type: String,
        trim: true,
        required: true
    }
});

export default mongoose.model('map', mapSchema);