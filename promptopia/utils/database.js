import mongoose from "mongoose";

let isConnected=false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true); // to avoid warnings in console
    if(isConnected){
        console.log('Using existing connection');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: process.env.MONGO_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected=true;
        console.log('Connected to database');
    }
    catch(err){
        console.log('Error connecting to database');
        console.log(err);
    }
}