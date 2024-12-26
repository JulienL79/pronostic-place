import { calculatePredict } from "./calculatePredict";
import { useSelector } from "react-redux";

export const calculatePronostics = () => {
    const { datas, maxBonus, maxNumber, numberDraw, bonusDraw, startDatePredict, endDatePredict , recentFilter } = useSelector((state) => state.datas);
    const numbersName = 'numbers';
    const bonusName = 'bonus';
    if (datas && recentFilter) {

        const currentDate = new Date()
        const dateRecentDrawFilter = new Date(currentDate)
        dateRecentDrawFilter.setMonth(currentDate.getMonth() - recentFilter)
        const datasFiltered = datas.filter(draw => new Date(draw.date) < dateRecentDrawFilter);

        const numberStatsFiltered = calculatePredict(datas, numbersName, maxNumber, numberDraw, startDatePredict, endDatePredict, dateRecentDrawFilter, datasFiltered)
        const bonusStatsFiltered = calculatePredict(datas, bonusName, maxBonus, bonusDraw, startDatePredict, endDatePredict, dateRecentDrawFilter, datasFiltered)

        function chooseBestNumbers(stats, nBest = 10) {
            const scoredData = stats.map(([num, sorties, formeGenerale, formeActuelle, ecartFav, ecartDefav, ecartActuel]) => {
                // Critère 1 : Forme générale positive
                const formeGeneraleAccepted = -0.2
                const formeGeneraleScore = (formeGenerale > formeGeneraleAccepted) ? Math.min(1, (formeGenerale + 1) / 2) : 0;

                // Critère 2 : Proximité de l'écart favorable
                let favorabilityScore = 0;
                const diffFav = Math.abs(ecartFav - ecartActuel);
                const diffDefav = Math.abs(ecartDefav - ecartActuel);
                if (diffFav < diffDefav) {
                    favorabilityScore = 0.75;
                    if (diffFav <= 2) {
                        favorabilityScore += 0.25
                    }
                }

                // Critère 3 : Forme générale - Forme actuelle
                const formeDiff = formeGenerale - formeActuelle;
                let formeDiffScore = 0;
                if (formeDiff > 0) {
                    formeDiffScore = Math.min(1, formeDiff / 5);  // Plus la différence est grande, plus le score est élevé
                } else if (formeDiff > -0.2) {
                    formeDiffScore = 0.5;  // Si égales, score médian
                }

                // Calcul du score total
                const totalScore = formeGeneraleScore + favorabilityScore + formeDiffScore;

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

}