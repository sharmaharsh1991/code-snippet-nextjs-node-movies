import mongoose from 'mongoose';
let client;

async function connectToDatabase() {
  if (!client || !client.isConnected()) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export { connectToDatabase };
