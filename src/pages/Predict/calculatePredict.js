import { calculateGap, calculateGapStats } from "./calculateGap";
import { calculateProbabilities } from "./calculateProbabilities";
import { filteredDraws } from "./filteredDraws";

// Fonction qui retourne un tableau avec les données de tous les numéros, même ceux jamais sortis
export function calculatePredict(allDraws, type, maxNumber, numberDraw, startDateFilter, endDateFilter, recentDrawFilter, datasAlreadyFiltered = null) {
    const normalProbabilityNumber = calculateProbabilities(maxNumber, numberDraw);
    const datasFiltered = datasAlreadyFiltered ? filteredDraws(datasAlreadyFiltered, startDateFilter, endDateFilter) : filteredDraws(allDraws, startDateFilter, endDateFilter);
    const numberOfFilteredDraws = datasFiltered.length;

    // Étape 1 : Calculer le nombre de sortie de chaque numéro
    const recapDraw = datasFiltered.flatMap(data => type === "numbers" ? data.numbers : data.bonus);
    const numberCount = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recapDraw.filter(n => n === number).length || 0; // Compte le nombre de fois que le numéro est sorti
        return obj;
    }, {});

    // Étape 2 : Calculer les sorties sur les `recentDraw` derniers tirages
    const recentDrawsData = allDraws.filter(draw => new Date(draw.date) >= recentDrawFilter);
    const numberOfRecentDraw = recentDrawsData.length
    const recentRecapDraw = recentDrawsData.flatMap(data => type === "numbers" ? data.numbers : data.bonus);
    const recentCount = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recentRecapDraw.filter(n => n === number).length || 0; // Compte pour les tirages récents
        return obj;
    }, {});

    // Étape 3 : Calculer les écarts actuels et généraux
    const [numberGaps, currentGaps] = calculateGap(allDraws, maxNumber, type, datasFiltered);

    // Étape 4 : Inclure tous les numéros dans le tableau final
    const numberCountArray = Array.from({ length: maxNumber }, (_, i) => i + 1).map(number => {
        const gapStat = calculateGapStats(numberGaps[number.toString()] || [])
        return [
        number.toString(),
        numberCount[number] || 0, // Nombre de sorties totales
        parseFloat((((numberCount[number] || 0) / numberOfFilteredDraws - normalProbabilityNumber) * 100).toFixed(2)), // Écart général (%)
        parseFloat(((((recentCount[number] || 0) / numberOfRecentDraw) - normalProbabilityNumber) * 100).toFixed(2)), // Écart actuel (%)
        gapStat.averageBestGap, // Ecarts favorables
        gapStat.averageWorthGap, // Ecarts défavorables
        currentGaps[number.toString()] === undefined ? allDraws.length : currentGaps[number.toString()], // Écart actuel
        numberOfFilteredDraws //nombre de tirage total pour explication des stats
    ]});

    return numberCountArray;
}
