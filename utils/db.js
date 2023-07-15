import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Mongoose:=> Mongodb already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('Mongoose:=> Mongodb connected');

    } catch (error) {
        console.log('Mongoose:=> Mongodb connection failed');
        console.log(error);
    }
}