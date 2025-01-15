import { z } from 'zod';


export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

import { newPatientSchema } from './utils';
export type NewPatient = z.infer<typeof newPatientSchema>;