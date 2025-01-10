import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

// Get bmi based on given height and weight
app.get('/bmi', (req, res) => {
    const height = req.query.height as string;
    const weight = req.query.weight as string;

    // Validate the query parameters
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    try {
        const bmi = calculateBmi(heightNum, weightNum);
        res.json({ height: heightNum, weight: weightNum, bmi });
        return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).json({ error: "An error occurred while calculating BMI" });
        return;
    }
});

app.post('/exercises', (req, res) => {

    console.log("Request body: " + req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    console.log("daily_exercises :" + daily_exercises);
    console.log("target:" + target);
    console.log('TypeOf daily_exercises: ' + typeof daily_exercises);
    console.log('TypeOf target: ' + typeof target);

    if ( !target || ! daily_exercises) {
        res.status(400).send({
            error: "parameters missing"
          });
    } else if (isNaN(Number(target))) {
        res.status(400).send({
            error: "Malformatted target"
        });
    } else if (!Array.isArray(daily_exercises) || !daily_exercises.every(ex => typeof ex === 'number')) {
        res.status(400).send({
            error: "Malformatted daily_exercises"
        });
    }

    const args = [
        'node',
        'script',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        ...daily_exercises.map(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        target.toString(),
    ];

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(args);
        console.log(result);
        res.json(result);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

