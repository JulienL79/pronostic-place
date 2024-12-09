import { useEffect, useState } from "react";
import { FormatedDate } from "../../features/FormatedDate";
import { filteredProbability } from "./filteredProbability";
import { useSelector } from "react-redux";
import '../../css/Table.css';

export function TablePredict({ settings, datas, type }) {
    const { game } = useSelector(state => state.datas);
    const [dataFiltered, setDataFiltered] = useState(datas)

    const [filters, setFilters] = useState({
        0: null,
        1: null,
        2: null,
        3: 'decroissant',
        4: null,
        5: null,
        6: null
    });

    useEffect(() => {
        setDataFiltered(filteredProbability(datas, filters));
    }, [filters, datas]);

    function handleChangeFilter(columnIndex) {
        setFilters((prevFilters) => {
            const newOrder = prevFilters[columnIndex] === null
                ? "croissant"
                : prevFilters[columnIndex] === "croissant"
                    ? "decroissant"
                    : null;

            return {
                ...prevFilters,
                [columnIndex]: newOrder
            };
        });
    }

    if (datas.length > 0) {
        // const NbOfColumn = settings.title.reduce((acc, value) => acc + value.col, 0);

        return (
            <div className="table-container scrollable-table">
                <table>
                    <thead>
                        <tr>
                            {settings.title.map((title, index) => {
                                return (<th colSpan={title.col} key={title.name} className="filter" onClick={() => handleChangeFilter(index)}>
                                    <div className="filter-header">
                                        <span>{title.name}</span>
                                        {filters[index] === null ? <i className="fa-solid fa-sort"></i> : filters[index] === 'croissant' ? <i className="fa-solid fa-sort-down"></i> : <i className="fa-solid fa-sort-up"></i>}
                                    </div> 
                                </th>)
                            })}
                    </tr>
                </thead>
                <tbody>
                    {dataFiltered.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className={type === 'numbers' ? 'ball' : 'star'}>{item[0]}</div>
                            </td>
                            <td className='predict-data'>{item[1]}</td>
                            <td className='predict-data'>{item[2]}</td>
                            <td className='predict-data'>{item[3]}</td>
                            <td className='predict-data'>{item[4]}</td>
                            <td className='predict-data'>{item[5]}</td>
                            {/* <td><a href={`https://www.fdj.fr/jeux-de-tirage/euromillions-my-million/resultats/${FormatedDate(item.date).shortDate}`}>Détail</a></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div >
        );
    } else {
        return (
            <p className='error'>Aucune donnée trouvée</p>
        )
    }
}