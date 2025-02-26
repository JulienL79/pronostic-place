import { useEffect, useState } from "react";
import { IDataStat, ITableProps } from "./TableProps";
import { useGameStore } from "@store/useGameStore";
import { Number } from "@atoms/Number";
import { FormatedDate } from "@utils/DateConverter";
import { IFilter } from "@pages/Pronostic/Pronostic";
import { filteredProbability } from "@pages/Pronostic/filteredProbability";
import { IDataResult } from "./TableProps";
import "./Table.css"

export const Table: React.FC<ITableProps> = ({
    page,
    datas
}) => {
    const { game } = useGameStore()
    const [datasFiltered, setDatasFiltered] = useState<IDataStat[] | null>(page === "pronostic" ? datas.datas : null)
    const [filters, setFilters] = useState<IFilter>({
        number: null,
        numberCount: null,
        generalStat: "croissant",
        currentStat: "decroissant",
        bestGap: null,
        worthGap: null,
        currentGap: null
    });
    const filterKeys: (keyof IFilter)[] = [
        "number",
        "numberCount",
        "generalStat",
        "currentStat",
        "bestGap",
        "worthGap",
        "currentGap"
    ];

    const handleChangeFilter = (columnIndex: number) => {

        const columnKey = filterKeys[columnIndex];

        if (!columnKey) return;

        setFilters((prevFilters: IFilter) => {
            const newOrder = prevFilters[columnKey] === null
                ? "croissant"
                : prevFilters[columnKey] === "croissant"
                    ? "decroissant"
                    : null;

            return {
                ...prevFilters,
                [columnKey]: newOrder
            };
        });
    }

    useEffect(() => {
        if(page === "pronostic") {
            setDatasFiltered(filteredProbability(datas.datas, filters));
        }
    }, [filters, datas])

    return (
        <div className={`${page} table`}>
            <div className="row row-title">
                {
                    page === "pronostic" ?
                        game && game[page].columns.map((header, index) => {
                            return (
                                <div className="header filter-header" onClick={() => handleChangeFilter(index)} key={`title-${header.title}`}>
                                    {header.title}
                                    {filters[filterKeys[index]] === null
                                    ? <i className="fa-solid fa-sort"></i>
                                    : filters[filterKeys[index]] === 'croissant' 
                                        ? <i className="fa-solid fa-sort-down"></i>
                                        : <i className="fa-solid fa-sort-up"></i>}
                                </div>)
                        })
                        :
                        game && game[page].columns.map((header) => {
                            return (
                                <div className="header" style={{ flex: header.columnNb }} key={`title-${header.title}`}>
                                    {header.title}
                                </div>)
                        })
                }
            </div>
            <div className="table-body">
                {
                    page === "pronostic" && datasFiltered ?

                        datasFiltered.map((data, index) => (
                            <div className='row' key={`row-${datas.type}-${index}`}>
                                <div className='data '>
                                    <Number data={data.number} type={datas.type === 'numbers' ? "number" : "bonus"} />
                                </div>
                                <div className='data stat-data'>{data.numberCount}</div>
                                <div className='data stat-data'>{data.generalStat}</div>
                                <div className='data stat-data'>{data.currentStat}</div>
                                <div className='data stat-data'>{data.bestGap}</div>
                                <div className='data stat-data'>{data.worthGap}</div>
                                <div className='data stat-data'>{data.currentGap}</div>
                            </div>
                        ))
                        :
                        (datas as IDataResult[]).map((data, rowIndex) => (
                            <div className='row' key={`row-${rowIndex}`}>
                                <div style={{ flex: "1" }} className='data result-date'>{FormatedDate(data.date)}</div>
                                <div style={{ flex: "2" }} className='data result-data-container'>
                                    {data.numbers.map((number, colIndex) => {
                                        return (
                                            <div className='data result-data' key={`ball-${colIndex}-${rowIndex}-${number}`}>
                                                <Number data={number} type="number" />
                                            </div>
                                        )
                                    })}

                                    {data.bonus.map((bonus, colIndex) => {
                                        return (
                                            <div className='data result-data' key={`ball-${colIndex}-${rowIndex}-${bonus}`}>
                                                <Number data={bonus} type="bonus" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))
                }
            </div>

        </div >
    )
}