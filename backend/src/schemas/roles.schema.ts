import { z } from 'zod';

export const Roles = z.enum(['Admin', 'User', 'Visitor']);

export type Roles = z.infer<typeof Roles>;
