import patientData from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): Patient[] => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        ...(ssn && { ssn }),
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    
    const newPatient: Patient = {
        ...patient,
        id: id
    };

    patients.push(newPatient);
    console.log('Added ' + newPatient.name + ' to patient list.');
    return newPatient;
};

export default {
    getPatients,
    addPatient,
};