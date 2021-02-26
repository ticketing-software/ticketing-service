import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.log("Error Connecting to the DB");
  }
}

export { connectDB };
