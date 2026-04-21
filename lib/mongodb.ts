import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "❌ MONGODB_URI is missing. Please add it to your .env.local file.\n" +
    "Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/outpro"
  );
}

interface Cache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoCache: Cache | undefined;
}

const cache: Cache = global._mongoCache ?? { conn: null, promise: null };
global._mongoCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };
    cache.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }

  return cache.conn;
}
