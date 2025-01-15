import express, { Request, Response, NextFunction } from 'express';
import patientServices from '../services/patientServices';
import { newPatientSchema } from '../utils';
import { z } from 'zod';
import { NewPatient, Patient } from '../types';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };
  

router.get('/', (_req, res) => {
    res.send(patientServices.getPatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientServices.addPatient(req.body);
    res.json(addedPatient);
});


router.use(errorMiddleware);
export default router;