export function calculateGap(allDraws, maxNumber, type, filteredDraws) {

    const revertedDraws = [...allDraws].reverse();
    const revertedFilteredDraws = [...filteredDraws].reverse();
    const numberGaps = {};
    const lastSeenFiltered = {};
    const lastSeen = {};

    // Parcourir les tirages dans l'ordre pour identifier les écarts dans la liste filtrée
    revertedFilteredDraws.forEach((draw, index) => {
        const numbersInDraw = type === "numbers" ? draw.numbers : draw.bonus;

        for (let number = 1; number <= maxNumber; number++) {
            // Si le numéro n'est pas dans le tirage
            if (!numbersInDraw.includes(number)) {
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
        const numbersInDraw = type === "numbers" ? draw.numbers : draw.bonus;

        for (let number = 1; number <= maxNumber; number++) {
            // Si le numéro n'est pas dans le tirage
            if (numbersInDraw.includes(number)) {
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
    if (gaps.length === 0) return 0;

    // Étape 1 : Calcul des fréquences de chaque écart
    const frequencyMap = {};
    gaps.forEach(gap => {
        frequencyMap[gap] = (frequencyMap[gap] || 0) + 1;
    });

    // Étape 2 : Trier les écarts par fréquence décroissante ou croissante
    const gapsInObject = Object.entries(frequencyMap)
    const decroissantGaps = gapsInObject.sort((a, b) => b[1] - a[1]);
    const croissantGaps = [...gapsInObject].sort((a, b) => a[1] - b[1]);

    // Étape 3 : Calculer la moyenne de l'écart le plus favorable et le moins favorabl
    const averageBestGap = (decroissantGaps.slice(0, 3).reduce((sum, gap) => sum + Number(gap[0]), 0) / 3).toFixed(2);
    const averageWorthGap = (croissantGaps.slice(0, 3).reduce((sum, gap) => sum + Number(gap[0]), 0) / 3).toFixed(2);

    return {averageBestGap, averageWorthGap}
}
