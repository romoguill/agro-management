import { z } from 'zod';

export const Crop = z.enum(
  [
    'Soy first',
    'Soy second',
    'Corn first',
    'Corn second',
    'Wheat',
    'Sunflower first',
    'Sunflower second',
  ],
  {
    invalid_type_error: 'Invalid crop type',
    required_error: 'Crop type is required',
  }
);

export type Crop = z.infer<typeof Crop>;
