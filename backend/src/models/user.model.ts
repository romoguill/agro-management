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

userSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret['__v'];
    delete ret['password'];
    return ret;
  },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
