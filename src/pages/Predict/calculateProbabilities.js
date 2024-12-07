export function calculateProbabilities(totalNumber, totalDraw) {
    let probability = 0;
    for (let i = 0; i < totalDraw; i++ ) {
        probability += 1 / (totalNumber - i)   
    }

    return (probability * 100).toFixed(2);
}