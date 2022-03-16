import mongoose from 'mongoose';

const uri = process.env.uri;

if(!uri) {
    console.log("Mongo URI not found");
    throw new Error("Mongo URI not found");
}

mongoose.connect(
    uri,
    (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully connected");
        }
    }
);

module.exports = mongoose;