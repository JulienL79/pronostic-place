import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { TableResult } from "./TableResult";
import { DateInput } from "../../components/DateInput";
import { getResultSettings } from "./getResultSettings";
import { showResult } from "./showResult";
import { Loading } from "../../components/Loading";
import '../../css/Result.css';

export function Result() {
    const { datas, game, filterResult, isCollected } = useSelector((state) => state.datas);
    const [dataToShow, setDataToShow] = useState([]);

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);
    const tableSettings = getResultSettings(game);

    useEffect(() => {

        if(isCollected) {
            const newDataToShow = showResult(datas, filterResult);
            setDataToShow(newDataToShow);
        }

    }, [datas, filterResult, isCollected])

    if (!isCollected) {

        return (
            <div className="page">
                <Loading />
            </div>
        )

    } else {
    
        return (
            <>
                <Helmet>
                  <title>{capitalizedGame} - Résultats</title>
                </Helmet>
                <div className="page">
                    <h1>{capitalizedGame} : Historique des résultats</h1>
                    {
                        game === 'euromillions' ?
                            <p className='paragraph'>Ce tableau regroupe tous les tirages de l’EuroMillions depuis le passage à l'Euromillions - My Million (le 04/02/2014).</p>
                        : 
                        <p className='paragraph'>Ce tableau regroupe tous les tirages du Loto depuis la mise en place du nouveau Loto (le 06/10/2008).</p>
                    }
                    
    
                    <div className='result-div'>
                        <fieldset>
                            <legend>Choix d'un tirage précis</legend>
                            <div className="search-date">
                                <p>Date</p>
                                <DateInput type="filter-result"/>
                            </div>
                        </fieldset>
                        <TableResult settings={tableSettings} datas={dataToShow} isFiltered={filterResult ? true : false} />
                    </div>
                </div>
            </>
        )
    }

}