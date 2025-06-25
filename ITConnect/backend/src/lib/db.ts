import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // për të lexuar .env

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/it_conect_db';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any); // për të shmangur error të TypeScript
    console.log('✅ MongoDB Connected Successfully');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
