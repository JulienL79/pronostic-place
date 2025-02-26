export const calculateProbabilities = (totalNumber: number, totalDraw: number) : number => {
    let probability = 0;
    for (let i = 0; i < totalDraw; i++ ) {
        probability += 1 / (totalNumber - i)   
    }
    return probability;
}