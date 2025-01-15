import { Gender, NewPatient } from "./types";
import {z} from 'zod';

// Parses each field and ensure that the return value is of type NewPatient


export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
  });

export const toNewPatient = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};
