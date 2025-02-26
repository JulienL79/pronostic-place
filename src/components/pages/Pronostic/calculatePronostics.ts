import { calculateStat } from "./calculateStat.ts";
import { IData } from "../../../types/Data";
import { IStatNumber } from "./Pronostic";
import { IGameSetting } from "@store/useGameStore";

type PredictResult = [number, number][]; // Tableau de paires [numéro, score]
type PredictOutput = [PredictResult, PredictResult] | null; // Peut être null si game est undefined

export const calculatePronostics = (
    game: IGameSetting,
    datas: IData[],
    startDatePredict: Date,
    endDatePredict: Date,
    recentFilter: Date
) : PredictOutput => {

    if (!game) return null

    if (datas.length === 0) return null

    const datasFiltered = datas.filter(draw => new Date(draw.date) < recentFilter);

    const numberStatsFiltered : IStatNumber[] = calculateStat(datas, "numbers", game.maxNumber, game.numberDraw, startDatePredict, endDatePredict, recentFilter, datasFiltered)
    const bonusStatsFiltered : IStatNumber[] = calculateStat(datas, "bonus", game.maxBonus, game.bonusDraw, game.name === 'euromillions' &&  startDatePredict < new Date("2016-09-27") ? new Date("2016-09-27") : startDatePredict, endDatePredict, recentFilter, datasFiltered)

    const chooseBestNumbers = (stats: IStatNumber[], nBest: number = 10) : PredictResult => {
        const endDate : Date = endDatePredict
        const startDate : Date = startDatePredict
        const periodLength = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)

        const scoredData = stats.map(stat => {
            const { number, generalStat, currentStat, bestGap, worthGap, currentGap } = stat
                // Critère 1 : Forme générale positive / négative
                const generalStatAccepted = -0.2
                const generalStatScore = periodLength > 7 
                ? (generalStat > generalStatAccepted) ? Math.min(1, (generalStat + 1) / 2) : 0 
                : (generalStat < generalStatAccepted) ? Math.min(1, (-generalStat + 1) / 2) : 0

                // Critère 2 : Proximité de l'écart favorable
                let favorabilityScore = 0
                const diffFav = Math.abs(bestGap - currentGap)
                const diffDefav = Math.abs(worthGap - currentGap)
                if (diffFav < diffDefav) {
                    favorabilityScore = 0.75
                    if (diffFav <= 2) {
                        favorabilityScore += 0.25
                    }
                }

                // Critère 3 : Forme générale - Forme actuelle
                const statDelta = periodLength > 7 ? generalStat - currentStat : currentStat - generalStat
                let statDeltaScore = 0
                if (statDelta > 0) {
                    statDeltaScore = Math.min(1, statDelta / 3)  // Plus la différence est grande, plus le score est élevé
                } else if (statDelta > -0.2) {
                    statDeltaScore = 0.5  // Si égales, score médian
                }

                // Calcul du score total
                const totalScore = generalStatScore + favorabilityScore + statDeltaScore

                // Retourne l'objet avec le score calculé
                return { number, score: totalScore }
            })

        // Trier les numéros par score de pertinence décroissant
        scoredData.sort((a, b) => b.score - a.score)  // Tri décroissant

        // Retourner les n meilleurs numéros
        return scoredData.slice(0, nBest).map(item => [item.number, item.score])
    }

    const bestNumbers = chooseBestNumbers(numberStatsFiltered, 10)
    const bestBonus = chooseBestNumbers(bonusStatsFiltered, 3)

    return [bestNumbers, bestBonus]
}