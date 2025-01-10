var calculator = function (a, b, op) {
    switch (op) {
        case 'multiply': return a * b;
        case 'add': return a + b;
        case 'divide':
            if (b === 0)
                throw new Error('Can\'t divide by 0!');
            return a / b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }
};
try {
    console.log(calculator(1, 5, 'divide'));
}
catch (error) {
    var errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
