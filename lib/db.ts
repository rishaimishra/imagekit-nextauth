import mongoose from "mongoose";

const MONGOURL = process.env.MONGO_DB_URL!;

if (!MONGOURL) {
  throw new Error("please define mongo url in env");
}

let cached = global.mongoose;

if (cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function DbConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.connect(MONGOURL).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
