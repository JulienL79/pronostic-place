import { useSelector } from "react-redux";
import { calculatePredict } from "./calculatePredict";
import { useEffect, useState } from "react";
import { calculateProbabilities } from "./calculateProbabilities";
import { TablePredict } from "./TablePredict";
import { getPredictSettings } from "./getPredictSettings";
import { filteredDraws } from "./filteredDraws";
import { filteredProbability } from "./filteredProbability";
import { DateInput } from "../../components/DateInput";
import { RecentFilter } from "../../components/RecentFilter";
import '../../css/Predict.css';
import { PredictNumber } from "./PredictNumber";


export function Predict() {
    const { datas, maxBonus, maxNumber, game, numberDraw, bonusDraw, recentFilter, startDatePredict, endDatePredict } = useSelector((state) => state.datas);
    const bonusDatas = game === 'euromillions' ? filteredDraws(datas, '2016-09-27', null) : datas;
    const currentDate = new Date()
    const dateRecentDrawFilter = new Date(currentDate)
    dateRecentDrawFilter.setMonth(currentDate.getMonth() - recentFilter)
    const [numbersStats, setNumbersStats] = useState(calculatePredict(datas, "numbers", maxNumber, numberDraw, startDatePredict, endDatePredict, dateRecentDrawFilter))
    const [bonusStats, setBonusStats] = useState(calculatePredict(bonusDatas, "bonus", maxBonus, bonusDraw, startDatePredict, endDatePredict, dateRecentDrawFilter))

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);
    const tableSettings = getPredictSettings(game);

    useEffect(() => {
        setNumbersStats(calculatePredict(datas, "numbers", maxNumber, numberDraw, startDatePredict, endDatePredict, dateRecentDrawFilter));
        setBonusStats(calculatePredict(bonusDatas, "bonus", maxBonus, bonusDraw, startDatePredict, endDatePredict, dateRecentDrawFilter));

    }, [recentFilter, startDatePredict, endDatePredict])

    return (
        <div className="page">
            <h1>Pronostics {capitalizedGame}</h1>

            <section>
                <h2 style={{ textAlign: 'left' }}>Nos pronostics</h2>
                <p className="paragraph">Notre logique de calcul des pronostics repose sur l'analyse statistique des données récentes pour évaluer les numéros et bonus en fonction de leur <strong>forme générale, leurs écarts, et leur forme actuelle</strong>, afin de sélectionner les options les plus pertinentes selon un système de <strong>scores pondérés</strong>.</p>
                <PredictNumber/>
            </section>

            <p className="paragraph">Le tableau ci-dessous regroupe toutes les statistiques du jeu {capitalizedGame} relatives à chacun des <strong>{maxNumber} numéros principaux</strong> (depuis {game === 'euromillions' ? '04/02/2014' : '06/10/2008'}), ainsi que des <strong>{maxBonus} numéros bonus</strong> {game === 'euromillions' ? '(depuis l’instauration des 12 étoiles le 27/09/2016)' : ''}</p>

            <div className="filter-bloc">
                <h2 style={{ textAlign: 'left' }}>Recherche avancée</h2>
                <fieldset>
                    <legend>Filtre sur la période générale *</legend>
                    <div className="search-date">
                        <p>Date de début</p>
                        <DateInput type="start-date-predict" />
                    </div>
                    <div className="search-date">
                        <p>Date de fin</p>
                        <DateInput type="end-date-predict" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Filtre sur la période récente **</legend>
                    <div className="search-date">
                        <p>Période</p>
                        <RecentFilter />
                    </div>
                </fieldset>
            </div>

            <div className="predict-div">
                <h2>Statistiques des numéros principaux</h2>
                <TablePredict settings={tableSettings} datas={numbersStats} type={'numbers'} />

                <h2>Statistiques des numéros bonus</h2>
                <TablePredict settings={tableSettings} datas={bonusStats} type={'bonus'} />
            </div>
            <h2 style={{ textAlign: 'left' }}>Explications</h2>
            <p className="paragraph">
                Le numéro principal n°<strong>{numbersStats[0][0]}</strong> a été tiré <strong>{numbersStats[0][1]}</strong> fois sur les <strong>{numbersStats[0][7]}</strong> tirages de la période générale* (par défaut la totalité des tirages).
                Sur cette période, ce numéro est sorti majoritairement tous les <strong>{numbersStats[0][4]}</strong> tirage(s), et il est le plus rarement sorti aux alentours des <strong>{numbersStats[0][5]}</strong> tirage(s). Actuellement il n'est pas apparu depuis <strong>{numbersStats[0][6]}</strong> tirage(s). Son taux de sortie est <strong>{numbersStats[0][2] > 0 ? `supérieur de ${numbersStats[0][2]}` : `inférieur de ${-numbersStats[0][2]}`}%</strong> à la probabilité de sortie normale sur la période générale* et il est <strong>{numbersStats[0][3] > 0 ? `supérieur de ${numbersStats[0][3]}` : `inférieur de ${-numbersStats[0][3]}`}%</strong> sur la période récente**.
            </p>
        </div>
    )
}