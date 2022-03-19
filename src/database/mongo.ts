import mongoose from 'mongoose';

const db = {
    connect() {
        return new Promise<void>((resolve, rejected) => {
            const uri = process.env.URI;
            
            if(!uri) {
                console.log("Mongo URI not found");
                throw new Error("Mongo URI not found");
            }
            mongoose.connect(
                uri,
                (err) => {
                    if(err) {
                        rejected(err);
                    } else {
                        console.log("Successfully connected");
                        resolve();
                    }
                }
            );
        }); 
    
    },

    disconnect() {
        console.log("this is disconnect");
        return new Promise<void>((resolve) => {
            // mongoose.disconnect();
            mongoose.connection.close();
            resolve();
        }); 
    }
}



export default db;