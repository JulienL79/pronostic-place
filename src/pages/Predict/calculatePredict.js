import { calculateGap, calculateGapStats } from "./calculateGap";
import { calculateProbabilities } from "./calculateProbabilities";
import { filteredDraws } from "./filteredDraws";

// Fonction qui retourne un tableau avec les données de tous les numéros, même ceux jamais sortis
export function calculatePredict(allDraws, type, maxNumber, numberDraw, startDateFilter, endDateFilter, recentDrawFilter = 20) {
    const numberOfDraws = allDraws.length;
    const normalProbabilityNumber = calculateProbabilities(maxNumber, numberDraw);
    const datasFiltered = filteredDraws(allDraws, startDateFilter, endDateFilter);
    const numberOfFilteredDraws = datasFiltered.length;
    console.log(datasFiltered)

    // Étape 1 : Calculer le nombre de sortie de chaque numéro
    const recapDraw = datasFiltered.flatMap(data => type === "numbers" ? data.numbers : data.stars);
    const numberCount = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recapDraw.filter(n => n === number.toString()).length || 0; // Compte le nombre de fois que le numéro est sorti
        return obj;
    }, {});

    // Étape 2 : Calculer les sorties sur les `recentDraw` derniers tirages
    const recentDrawsData = allDraws.slice(-recentDrawFilter);
    const recentRecapDraw = recentDrawsData.flatMap(data => type === "numbers" ? data.numbers : data.stars);
    const recentCount = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recentRecapDraw.filter(n => n === number.toString()).length || 0; // Compte pour les tirages récents
        return obj;
    }, {});

    // Étape 3 : Calculer les écarts actuels et généraux
    const allGaps = calculateGap(allDraws, maxNumber, type, datasFiltered);

    // Étape 4 : Inclure tous les numéros dans le tableau final
    const numberCountArray = Array.from({ length: maxNumber }, (_, i) => i + 1).map(number => [
        number.toString(),
        numberCount[number] || 0, // Nombre de sorties totales
        parseFloat((((numberCount[number] || 0) / numberOfFilteredDraws - normalProbabilityNumber) * 100).toFixed(2)), // Écart général (%)
        parseFloat(((((recentCount[number] || 0) / recentDrawFilter) - normalProbabilityNumber) * 100).toFixed(2)), // Écart actuel (%)
        calculateGapStats(allGaps[0][number.toString()] || []), // Moyenne des écarts (général)
        allGaps[1][number.toString()] === undefined ? allDraws.length : allGaps[1][number.toString()] // Écart actuel
    ]);

    // Étape 5 : Les mettre par défaut dans l'ordre croissant des numéros
    const numberCountFiltered = numberCountArray.sort(([valueA, ], [valueB,]) => valueA - valueB);

    return numberCountArray;
}
