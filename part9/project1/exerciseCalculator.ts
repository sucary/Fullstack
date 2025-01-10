/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface ExValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (args: string[]): ExValues =>{

    const exHours = args.slice(2).map(Number);
    const target =  Number(args[3]);
    

    console.log('The array received in exCal is: ' + exHours);
    console.log('The target received in exCal is: ' + target);

    if (isNaN(target) || exHours.some(isNaN)) {
        throw new Error('Provided values were not numbers!');
    }
    
    const periodLength = exHours.length;
    const trainingDays = exHours.filter((h: number) => h > 0).length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    const average = exHours.reduce((sum: any, h: any) => sum + h, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;
    
    if (average >= target) {
        rating = 3;
        ratingDescription = 'Target achieved';
    } else if (average >= target * 0.5) {
        rating = 2;
        ratingDescription = 'You need to work harder';
    } else {
        rating = 1;
        ratingDescription = 'That did not count';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

};

try {
    console.log(calculateExercises(process.argv));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    
}

export default calculateExercises;