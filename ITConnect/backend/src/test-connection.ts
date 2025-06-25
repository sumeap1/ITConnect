import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/it_conect_db';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB!');
    
    // Test if connection is working
    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('Available collections:', collections?.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('Successfully disconnected from MongoDB!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
    process.exit(1);
  }
}

testConnection(); 