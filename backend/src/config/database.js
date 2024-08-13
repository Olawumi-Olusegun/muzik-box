import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI || "";

let connected = false;

const connectDB = async () => {

    if(!MONGODB_URI) {
        throw new Error("Invalid database string");
    }

    mongoose.set("strictQuery", true);

    if(connected) {
        console.log("Connection already established")
        return;
    }

    try {

        mongoose.connection.on("connected", () => {
            console.log("Connection established")
        });

        await mongoose.connect(MONGODB_URI);
        connected = true;
        console.log("Database connection established");
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error?.message}`);
        process.exit(1);
    }
}

export default connectDB;