import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableResult } from "./TableResult";
import { DateInput } from "../../components/DateInput";
import { getResultSettings } from "./getResultSettings";
import { showResult } from "./showResult";
import '../../css/Result.css';

export function Result() {
    const { datas, game, filterResult } = useSelector((state) => state.datas);
    const [dataToShow, setDataToShow] = useState([]);

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);
    const tableSettings = getResultSettings(game);

    useEffect(() => {
        console.log(datas)
        const newDataToShow = showResult(datas, filterResult);
        setDataToShow(newDataToShow);
    }, [datas, filterResult])

    return (
        <div className="page">
            <h1>Résultats {capitalizedGame}</h1>
            {
                game === 'euromillions' ?
                    <p className='paragraph'>Ce tableau regroupe tous les tirages de l’EuroMillions depuis le passage à l'Euromillions - My Million (le 04/02/2014).</p>
                : 
                <p className='paragraph'>Ce tableau regroupe tous les tirages du loto depuis la mise en place du nouveau loto (le 06/10/2008).</p>
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
    )
}