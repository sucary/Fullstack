import express from 'express';
import diagnosisServices from '../services/diagnosisServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisServices.getDiagnosis());
});

export default router;