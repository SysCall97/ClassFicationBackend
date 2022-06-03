import mongoose from 'mongoose';
import { IDb } from '../interfaces';

class MongoDB implements IDb {
    connect(callback: Function): Promise<void> {
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
                        callback();
                    }
                }
            );
        });
    }
}

export default MongoDB;