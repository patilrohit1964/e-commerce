import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: true,
    });
  }

  cached.conn = await cached.promise;
  console.log('cached.conn',cached.conn,'cached connection');
  return cached.conn;
}

export default connectDb;
