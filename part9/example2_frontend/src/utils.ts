import { NewEntry, Visibility, Weather } from './types';
import { z } from 'zod';


export const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object);
};
