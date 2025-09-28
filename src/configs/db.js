import mongoose from "mongoose";

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to DB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

export default connectToDb;