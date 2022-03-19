import mongoose from 'mongoose';

const db = {
    connect() {
        const uri = process.env.URI;
        
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
    
    },

    disconnect() {
        console.log("this is disconnect");
        mongoose.disconnect();
    }
}



export default db;