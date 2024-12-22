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
        2: 'decroissant',
        3: 'croissant',
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
            <div className="scrollable-table table">
                <div className="row row-title">
                    {settings.title.map((title, index) => {
                        return (
                            <div className="filter-header" onClick={() => handleChangeFilter(index)} key={`title-${index}`}>
                                {title.name}
                                {filters[index] === null ? <i className="fa-solid fa-sort"></i> : filters[index] === 'croissant' ? <i className="fa-solid fa-sort-down"></i> : <i className="fa-solid fa-sort-up"></i>}
                            </div>)
                    })}
                </div>
                <div className="table-body">
                {dataFiltered.map((item, index) => (
                            <div className='row' key={`row-${index}`}>
                                <div className='data'>
                                    <div className={type === 'numbers' && game === 'euromillions' ? 'ball euromillions' : type === 'numbers' && game === 'loto' ? 'ball loto' : game === 'euromillions' ? 'euromillions-bonus' : 'ball loto-bonus'}>{item[0]}</div>
                                </div>
                                <div className='data predict-data'>{item[1]}</div>
                                <div className='data predict-data'>{item[2]}</div>
                                <div className='data predict-data'>{item[3]}</div>
                                <div className='data predict-data'>{item[4]}</div>
                                <div className='data predict-data'>{item[5]}</div>
                                <div className='data predict-data'>{item[6]}</div>
                            </div>
                        ))}
                </div>


                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        
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