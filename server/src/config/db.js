import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI is required');
  mongoose.set('strictQuery', true);
  // Mongoose 7+/MongoDB driver no longer accept useNewUrlParser/useUnifiedTopology
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

