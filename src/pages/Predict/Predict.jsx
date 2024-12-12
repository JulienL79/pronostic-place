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
    const [numbersStats, setNumbersStats] = useState(calculatePredict(datas, "numbers", maxNumber, numberDraw, startDatePredict, endDatePredict, recentFilter))
    const [bonusStats, setBonusStats] = useState(calculatePredict(bonusDatas, "bonus", maxBonus, bonusDraw, startDatePredict, endDatePredict, recentFilter))

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);
    const tableSettings = getPredictSettings(game);

    useEffect(() => {
        console.log(startDatePredict)
        setNumbersStats(calculatePredict(datas, "numbers", maxNumber, numberDraw, startDatePredict, endDatePredict, recentFilter));
        setBonusStats(calculatePredict(bonusDatas, "bonus", maxBonus, bonusDraw, startDatePredict, endDatePredict, recentFilter));
        
    }, [recentFilter, startDatePredict, endDatePredict])

    console.log(numbersStats)

    return (
        <div className="page">
            <h1>Pronostics {capitalizedGame}</h1>
                
            <section>
                <h2 Style='text-align: left'>Nos pronostics</h2>
                <p className="paragraph">Vous trouverez ci-dessous nos pronostics qui tiennent compte de différents facteurs.</p>
                <PredictNumber datasNumber={numbersStats} datasBonus={bonusStats}/>
            </section>

            <p className="paragraph">Le tableau ci-dessous regroupe toutes les statistiques du jeu {capitalizedGame} relatives à chacun des {maxNumber} numéros (depuis la création du jeu), ainsi que des {maxBonus} numéros bonus {game === 'euromillions' ? '(depuis l’instauration des 12 étoiles le 27/09/2016)' : ''}</p>

            <div className="filter-bloc">
                <h2 Style='text-align: left'>Recherche avancée</h2>
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
            <h2 Style='text-align: left'>Explications</h2>
            <p className="paragraph">
                Le numéro principal n°<strong>{numbersStats[0][0]}</strong> est sorti <strong>{numbersStats[0][1]}</strong> fois sur les <strong>{numbersStats[0][6]}</strong> tirages de la période générale* (par défaut la totalité des tirages).
                Sur cette période, ce numéro était tiré en moyenne tous les <strong>{numbersStats[0][4]}</strong> tirage(s), actuellement il n'est pas apparu depuis <strong>{numbersStats[0][5]}</strong> tirage(s). Son taux de sortie est <strong>{numbersStats[0][2] > 0 ? `supérieur de ${numbersStats[0][2]}` : `inférieur de ${-numbersStats[0][2]}`}%</strong> à la probabilité de sortie normale sur la période générale* et il est <strong>{numbersStats[0][3] > 0 ? `supérieur de ${numbersStats[0][3]}` : `inférieur de ${-numbersStats[0][3]}`}%</strong> sur la période récente**.
            </p>
        </div>
    )
}