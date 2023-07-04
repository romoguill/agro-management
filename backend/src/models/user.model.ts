import mongoose from 'mongoose';
import { User } from '../schemas/user.schemas';

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
