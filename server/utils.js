export const generateRandomSixDigits = () => {
    let minM = 100000;
    let maxM = 999999;
    return Math.floor(Math
        .random() * (maxM - minM + 1)) + minM;
}

export const generatePassCode = () => {
    const numbers = generateRandomSixDigits()
    return `PASS${numbers}`
}