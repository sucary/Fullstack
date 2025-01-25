import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    ssn?: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
import { newPatientSchema } from './utils';
export type NewPatient = z.infer<typeof newPatientSchema>;