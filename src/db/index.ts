import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || '');

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB Connected Successfully');
    });

    connection.on('error', (e: any) => {
      console.log('Failed to connect MongoDB Error: ', e);
      process.exit();
    });
  } catch (e: any) {
    console.error('Something Went Wrong! Error: ', e);
  }
};
