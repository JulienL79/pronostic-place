export function calculateGap(allDraws, maxNumber, type, filteredDraws) {

    const revertedDraws = [...allDraws].reverse();
    const revertedFilteredDraws = [...filteredDraws].reverse();
    const numberGaps = {};
    const lastSeenFiltered = {};
    const lastSeen = {};

    // Parcourir les tirages dans l'ordre pour identifier les écarts dans la liste filtrée
    revertedFilteredDraws.forEach((draw, index) => {
        const numbersInDraw = type === "numbers" ? draw.numbers : draw.stars;

        for (let number = 1; number <= maxNumber; number++) {
            // Si le numéro n'est pas dans le tirage
            if (!numbersInDraw.includes(number.toString())) {
                if (!numberGaps[number]) numberGaps[number] = [];
                if (lastSeenFiltered[number] !== undefined) {
                    numberGaps[number][numberGaps[number].length - 1]++;
                }
            } else {
                // Si le numéro est présent dans le tirage
                if (lastSeenFiltered[number] !== undefined) {
                    numberGaps[number].push(0); // Marque la fin d'un écart
                } else {
                    numberGaps[number] = [0]; // Initialise un tableau pour ce numéro
                }
                lastSeenFiltered[number] = index; // Mettre à jour la dernière vue
            }
        }
    });

    // Parcourir les tirages dans l'ordre pour identifier les écarts dans la liste globale
    revertedDraws.forEach((draw, index) => {
        const numbersInDraw = type === "numbers" ? draw.numbers : draw.stars;

        for (let number = 1; number <= maxNumber; number++) {
            // Si le numéro n'est pas dans le tirage
            if (numbersInDraw.includes(number.toString())) {
                lastSeen[number] = index; // Mettre à jour la dernière vue
            }
        }
    });

    // Calculer l'écart actuel pour chaque numéro (tirage actuel - dernier tirage où le numéro est sorti)
    const currentGaps = {};
    const lastDraw = revertedDraws.length - 1; // Dernier tirage

    for (let number = 1; number <= maxNumber; number++) {
        if (lastSeen[number] !== undefined) {
            const lastAppearance = lastSeen[number];
            currentGaps[number] = lastDraw - lastAppearance; // Calcul de l'écart actuel
        } else {
            currentGaps[number] = lastDraw + 1; // Si le numéro n'a jamais été vu
        }
    }

    return [numberGaps, currentGaps]
}

export function calculateGapStats(gaps) {
    const total = gaps.reduce((sum, gap) => sum + gap, 0);
    return (total / gaps.length || 0).toFixed(2); // Moyenne
};