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

    return(
        <div className="page">
            <h1>Pronostics {capitalizedGame}</h1>
            <p className="paragraph">Ce tableau regroupe toutes les statistiques du jeu {capitalizedGame} relatives à chacun des {maxNumber} numéros (depuis la création du jeu), ainsi que des {maxBonus} numéros bonus {game === 'euromillions' ? '(depuis l’instauration des 12 étoiles le 27/09/2016)' : ''}</p>

            <h2 Style='text-align: left'>Recherche avancée</h2>
            <div className="search-date">
                <p>Date de début</p>
                <DateInput type="start-date-predict"/>
            </div>
            <div className="search-date">
                <p>Date de fin</p>
                <DateInput type="end-date-predict"/>
            </div>
            <div className="search-date">
                <p>Période de calcul de la forme actuelle</p>
                <RecentFilter />
            </div>

            <div className="predict-div">
                <h2>Statistiques des numéros principaux</h2>
                <TablePredict settings={tableSettings} datas={numbersStats} type={'numbers'}/>

                <h2>Statistiques des numéros bonus</h2>
                <TablePredict settings={tableSettings} datas={bonusStats} type={'bonus'}/>
            </div>
        </div>
    )
}