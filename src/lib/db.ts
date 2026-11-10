import mongoose from "mongoose";

// NOTE: env is read at CALL time, not module-load time. During `next build`
// (e.g. on Vercel) this module gets evaluated before env vars may exist —
// throwing at the top level here would break the production build.
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI ?? "";
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to your environment variables."
    );
  }
  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const g = globalThis as unknown as { mongooseCache?: MongooseCache };

const cached: MongooseCache = g.mongooseCache ?? { conn: null, promise: null };
g.mongooseCache = cached;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(getMongoUri(), {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
