// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import patientData from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';
import patientWithoutId from "../../data/patient_full";

const patients: Patient[] = patientWithoutId;

const getPatients = (): Patient[] => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries: entries || []
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    
    const newPatient: Patient = {
        ...patient,
        id: id,
        entries: []
    };

    patients.push(newPatient);
    console.log('Added ' + newPatient.name + ' to patient list.');
    return newPatient;
};

export default {
    getPatients,
    addPatient,
};