
const calculateBmi = (height: number, weight: number) => {
    if (typeof height !== "number" || typeof weight !== "number") {
        throw new Error("Error: Height or weight is not a number.");
    } else {
        let bmi = weight / (height / 100) ** 2;
        if (bmi < 18.5 || bmi > 25) {
            return "BMI is not normal.";
        } else {
            return "Your are healthy!";
        }
    }
};

if (require.main === module) {
    const args = process.argv.slice(2);
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
        console.error('Error: malformatted parameters');
        process.exit(1);
    }

    console.log(calculateBmi(height, weight));
}

console.log(calculateBmi(180, 74));
export default calculateBmi;