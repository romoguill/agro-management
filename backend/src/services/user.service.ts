import UserModel from '../models/user.model';
import { FilterQuery } from 'mongoose';
import { User, UserWithoutSensitiveData } from '../schemas/user.schemas';

export function getAllUsers() {
  return UserModel.find({}, { email: true, firstName: true, lastName: true })
    .lean()
    .exec();
}

export function getUserById(id: string) {
  return UserModel.findById(id, {
    email: true,
    firstName: true,
    lastName: true,
  })
    .lean()
    .exec();
}

export function getUser(
  queryParams: FilterQuery<UserWithoutSensitiveData>,
  showPassword = false
) {
  if (showPassword) {
    return UserModel.findOne(queryParams).select({ password: 1 }).lean().exec();
  } else {
    return UserModel.findOne(queryParams).lean().exec();
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
  })
    .lean()
    .exec();
}

export function deleteUser(emailQuery: FilterQuery<{ email: string }>) {
  return UserModel.findOneAndDelete(emailQuery).lean().exec();
}
