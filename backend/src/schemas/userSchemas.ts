import { z } from 'zod';
import mongoose from 'mongoose';

const User = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

const hasPasswordConfirmation = z.object({
  passwordConfirmation: z.string({
    required_error: 'Password confirmation is required',
  }),
});

const withId = z.object({ _id: z.instanceof(mongoose.Types.ObjectId) });

const UserWithoutSensitiveData = User.omit({ password: true });

const UserWithId = User.merge(withId);

const createUserPayload = User.merge(hasPasswordConfirmation).refine(
  (data) => data.password === data.passwordConfirmation,
  { message: "Passwords don't match" }
);

export const RequestCreateUser = z.object({
  params: z.any().optional(),
  query: z.any().optional(),
  body: createUserPayload,
});

export type User = z.infer<typeof User>;
export type UserWithId = z.infer<typeof UserWithId>;
export type UserWithoutSensitiveData = z.infer<typeof UserWithoutSensitiveData>;
