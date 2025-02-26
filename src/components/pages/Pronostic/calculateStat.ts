import { calculateGap, calculateGapStats } from "./calculateGap.ts";
import { calculateProbabilities } from "./calculateProbabilities.ts";
import { filteredDraws } from "./filteredDraws.ts";
import { IStatNumber } from "./Pronostic";
import { IData } from "../../../types/Data";

interface IGapStats {
    averageBestGap: number;  // Meilleur écart
    averageWorthGap: number; // Pire écart
}

// Fonction qui retourne un tableau avec les stats de tous les numéros, même ceux jamais sortis
export const calculateStat = (
    allDraws : IData[],
    type : "numbers" | "bonus",
    maxNumber : number,
    numberDraw: number,
    startDateFilter : Date,
    endDateFilter : Date,
    recentDrawFilter : Date,
    datasAlreadyFiltered? : IData[]
) : IStatNumber[] => {

    const normalProbabilityNumber = calculateProbabilities(maxNumber, numberDraw);
    const datasFiltered = datasAlreadyFiltered ? filteredDraws(datasAlreadyFiltered, startDateFilter, endDateFilter) : filteredDraws(allDraws, startDateFilter, endDateFilter);
    const numberOfFilteredDraws = datasFiltered.length;

    // Étape 1 : Calculer le nombre de sortie de chaque numéro
    const recapDraw = datasFiltered.flatMap(data => type === "numbers" ? data.numbers : data.bonus);
    const numberCount: Record<number, number> = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recapDraw.filter(n => n === number).length || 0; // Compte le nombre de fois que le numéro est sorti
        return obj;
    }, {} as Record<number, number>);

    // Étape 2 : Calculer les sorties sur les `recentDraw` derniers tirages
    const recentDrawsData = allDraws.filter(draw => new Date(draw.date) >= recentDrawFilter);
    const numberOfRecentDraw = recentDrawsData.length
    const recentRecapDraw = recentDrawsData.flatMap(data => type === "numbers" ? data.numbers : data.bonus);
    const recentCount = Array.from({ length: maxNumber }, (_, i) => i + 1).reduce((obj, number) => {
        obj[number] = recentRecapDraw.filter(n => n === number).length || 0; // Compte pour les tirages récents
        return obj;
    }, {} as Record<number, number>);

    // Étape 3 : Calculer les écarts actuels et généraux
    const [numberGaps, currentGaps] : [Record<number, number[]>, Record<number, number>] = calculateGap(allDraws, maxNumber, type, datasFiltered);

    // Étape 4 : Inclure tous les numéros dans le tableau final
    const numberCountArray : IStatNumber[] = Array.from({ length: maxNumber }, (_, i) => i + 1).map(number => {
        const gapStat: IGapStats = calculateGapStats(numberGaps[number] || [])
        return {
        number : number,
        numberCount : numberCount[number] || 0, // Nombre de sorties totales
        generalStat: parseFloat((((numberCount[number] || 0) / numberOfFilteredDraws - normalProbabilityNumber) * 100).toFixed(2)), // Proba général (%)
        currentStat : parseFloat(((((recentCount[number] || 0) / numberOfRecentDraw) - normalProbabilityNumber) * 100).toFixed(2)), // Proba actuel (%)
        bestGap : gapStat.averageBestGap, // Ecarts favorables
        worthGap : gapStat.averageWorthGap, // Ecarts défavorables
        currentGap : currentGaps[number] === undefined ? allDraws.length : currentGaps[number], // Écart actuel
        totalDraws: numberOfFilteredDraws //nombre de tirage total pour explication des stats
    }});

    return numberCountArray;
}
