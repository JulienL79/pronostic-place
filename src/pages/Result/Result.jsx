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
        const newDataToShow = showResult(datas, filterResult);
        setDataToShow(newDataToShow);
    }, [datas, filterResult])

    return (
        <div className="page">
            <h1>Résultats {capitalizedGame}</h1>
            <p className='paragraph'>Ce tableau regroupe tous les tirages de l’EuroMillions depuis la création du jeu (le 13/02/2004).</p>

            <div className='result-div'>
                <div className="search-date">
                    <p>Vous recherchez un tirage précis?</p>
                    <DateInput type="filter-result"/>
                </div>
                <TableResult settings={tableSettings} datas={dataToShow} isFiltered={filterResult ? true : false} />
            </div>
        </div>
    )
}