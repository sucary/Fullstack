import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());

import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';
import patientServices from './services/patientServices';
import diagnosisServices from './services/diagnosisServices';

app.use(cors({ origin: 'http://localhost:5173' })); // Frontend origin
app.use(express.json());

const PORT = 3001;

// Define consistent routes
app.get(['/ping', '/api/ping'], (_req, res) => {
    console.log('Ping route accessed');
    res.send('pong');
});

app.get(['/api/patients/:id'], (req, res) => {
    const id = req.params.id;
    console.log('Rendering patient ', req.params.name);
    const patient = patientServices.getPatients().find((patient: { id: string }) => patient.id === id);
    res.json(patient);
});

app.get(['api/diagnoses'], (req, res) => {
    const code = req.params.code;
    const diagnosis = diagnosisServices.getDiagnosis().find((diagnosis: { code: string }) => diagnosis.code === code);
    res.json(diagnosis);
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
