import express from 'express';
import cors from 'cors';


const app = express();

import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

app.use(cors({ origin: 'http://localhost:5173' })); // Frontend origin
app.use(express.json());

const PORT = 3001;

// Define consistent routes
app.get(['/ping', '/api/ping'], (_req, res) => {
    console.log('Ping route accessed');
    res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
