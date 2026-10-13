import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async (): Promise<boolean> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dronetv';

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to not block development
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB successfully connected to: ${uri}`);
    return true;
  } catch (error: any) {
    isConnectedToMongo = false;
    console.warn(
      `[Database] MongoDB connection note: ${error.message}. Running with resilient fallback storage so all CRUD operations, search, filter, and admin controls operate out-of-the-box.`
    );
    return false;
  }
};
