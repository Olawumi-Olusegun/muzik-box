import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI || "";

const connectDB = async () => {

    if(!MONGODB_URI) {
        throw new Error("Invalid database string");
    }

    mongoose.set("strictQuery", true);

    if(mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(MONGODB_URI);
            console.log("Connection established");
        } catch (error) {
            console.error(`Error connection to mongoDB: ${error?.message}`);
            process.exit(1);
        }

    } else {
        console.log("Connection already established")
    }

}

export default connectDB;