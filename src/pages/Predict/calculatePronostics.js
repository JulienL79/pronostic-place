import { calculatePredict } from "./calculatePredict";
import { useSelector } from "react-redux";

export function calculatePronostics() {
    const { datas, maxBonus, maxNumber, numberDraw, bonusDraw, recentFilter } = useSelector((state) => state.datas);
    const datasFiltered = datas.slice(recentFilter);
    const numbersName = 'numbers';
    const bonusName = 'bonus';

    const numberStatsFiltered = calculatePredict(datas, numbersName, maxNumber, numberDraw, null, null, recentFilter, datasFiltered)
    const bonusStatsFiltered = calculatePredict(datas, bonusName, maxBonus, bonusDraw, null, null, recentFilter, datasFiltered)

    function chooseBestNumbers(stats, nBest = 10) {
        const scoredData = stats.map(([num, sorties, formeGenerale, formeActuelle, ecartFav, ecartDefav, ecartActuel]) => {
            // Critère 1 : Forme générale positive
            const formeGeneraleAccepted = -0.2
            const formeGeneraleScore = (formeGenerale > formeGeneraleAccepted) ? Math.min(1, (formeGenerale + 1) / 2) : 0;

            // Critère 2 : Proximité de l'écart favorable
            let favorabilityScore = 0;
            const diffFav = Math.abs(ecartFav - ecartActuel);
            if (diffFav <= 1) {
                favorabilityScore = 1;  // Très proche
            } else if (diffFav <= 2) {
                favorabilityScore = 0.75;  // Modérément proche
            } else if (diffFav <= 3) {
                favorabilityScore = 0.5;  // Encore plus éloigné
            }

            // Critère 3 : Proximité de l'écart défavorable (score négatif)
            let unfavorabilityScore = 0;
            const diffDefav = Math.abs(ecartDefav - ecartActuel);
            if (diffDefav <= 1) {
                unfavorabilityScore = -1;  // Très proche
            } else if (diffDefav <= 2) {
                unfavorabilityScore = -0.75;  // Modérément proche
            } else if (diffDefav <= 3) {
                unfavorabilityScore = -0.5;  // Encore plus éloigné
            }

            // Critère 4 : Forme générale - Forme actuelle
            const formeDiff = formeGenerale - formeActuelle;
            let formeDiffScore = 0;
            if (formeDiff > 0) {
                formeDiffScore = Math.min(1, formeDiff / 5);  // Plus la différence est grande, plus le score est élevé
            } else if (formeDiff === 0) {
                formeDiffScore = 0.5;  // Si égales, score médian
            }

            // Calcul du score total
            const totalScore = formeGeneraleScore + favorabilityScore + unfavorabilityScore + formeDiffScore;

            // Retourne l'objet avec le score calculé
            return { num, score: totalScore, rawData: [num, sorties, formeGenerale, formeActuelle, ecartFav, ecartDefav, ecartActuel] };
        });

        // Trier les numéros par score de pertinence décroissant
        scoredData.sort((a, b) => b.score - a.score);  // Tri décroissant

        // Retourner les n meilleurs numéros
        return scoredData.slice(0, nBest).map(item => [item.num, item.score]);
    }

    const bestNumbers = chooseBestNumbers(numberStatsFiltered, 10)
    const bestBonus = chooseBestNumbers(bonusStatsFiltered, 3)

    return [bestNumbers, bestBonus];
}