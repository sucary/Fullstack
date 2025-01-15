import diagnoses from '../../data/diagnoses';
import {Diagnosis}  from '../types';


const getDiagnosis = (): Diagnosis[] => {
    return diagnoses;
};

const getNonSensiviteDiagnosis = (): Diagnosis[] => {
    return diagnoses.map(({ code, name }) => ({
        code,
        name
    }));
};


    

export default {
    getDiagnosis,
    getNonSensiviteDiagnosis
};