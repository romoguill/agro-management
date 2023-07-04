import UserModel from '../models/user.model';
import { FilterQuery } from 'mongoose';
import { User, UserWithoutSensitiveData } from '../schemas/user.schemas';

export function getAllUsers() {
  return UserModel.find().exec();
}

export function getUser(
  queryParams: FilterQuery<UserWithoutSensitiveData>,
  showPassword = false
) {
  if (showPassword) {
    return UserModel.find(queryParams).select({ password: 1 }).exec();
  } else {
    return UserModel.find(queryParams).exec();
  }
}

export function createUser(newUser: User) {
  return UserModel.create(newUser);
}

export function updateUser(
  emailQuery: FilterQuery<{ email: string }>,
  userUpdated: User
) {
  return UserModel.findOneAndUpdate(emailQuery, userUpdated, {
    new: true,
  }).exec();
}

export function deleteUser(emailQuery: FilterQuery<{ email: string }>) {
  return UserModel.findOneAndDelete(emailQuery).exec();
}
