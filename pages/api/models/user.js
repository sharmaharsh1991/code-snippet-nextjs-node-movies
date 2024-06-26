import mongoose from 'mongoose';
let User;
try {
  User = mongoose.model('User');
} catch (error) {
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  User = mongoose.model('User', userSchema);
}

export default User;
