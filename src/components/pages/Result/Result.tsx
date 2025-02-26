import { useDataStore } from "@store/useDataStore";
import { useGameStore } from "@store/useGameStore";
import { capitalizeFirstChar } from "@utils/StringConverter";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Pagination } from "@molecules/Pagination";
import { Loader } from "@molecules/Loader";
import { Table } from "@atoms/Table";
import { DateInput } from "@atoms/DateInput";
import { ParagraphInfo } from "@atoms/ParagraphInfo";

interface IData {
    _id: string,
    date: string,
    numbers: number[],
    bonus: number[],
    __v: number
}

export const Result = () => {
    const { game } = useGameStore()
    const { gameDatas, isConnected, isFilled } = useDataStore()
    const [currentData, setCurrentData] = useState<IData[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [dataFiltered, setDataFiltered] = useState<IData[]>([])
    const [dateFilter, setDateFilter] = useState<Date | null>(null)

    useEffect(() => {
        const filterByDate = (filter: Date): IData[] => {
            const newDatas = game && gameDatas[game.name] ?
                gameDatas[game.name].filter(data => {
                    // Convertir la date de l'objet en objet Date
                    const dataDate = new Date(data.date);

                    // Comparer les dates (la partie temps sera ignorée lors de la comparaison)
                    return dataDate.setHours(0, 0, 0, 0) === filter.setHours(0, 0, 0, 0);
                })
                : []
            return newDatas
        }

        if (dateFilter) {
            const newDatas = filterByDate(dateFilter)
            setDataFiltered(newDatas)
            setCurrentPage(1)
        } else {
            setDataFiltered([])
        }

    }, [dateFilter])

    if (!isConnected) {
        return (
            <div className="page">
                <Loader mainMessage="Démarrage du serveur" suppMessage={["Cette opération peut prendre plusieurs minutes"]} />
            </div>
        )
    }

    if (!isFilled) {
        return (
            <div className="page">
                <Loader mainMessage="Chargement des données" />
            </div>
        )
    }

    if (game && gameDatas[game.name]) {
        return (
            <>
                <Helmet>
                    <title>{game && capitalizeFirstChar(game.name)} - Résultats</title>
                </Helmet>

                <div className="page">

                    <h1>{game && capitalizeFirstChar(game.name)} : Historique des résultats</h1>

                    <ParagraphInfo type="result" />

                    <div className="split">
                        <div className="filter-bloc">
                            <h2>Recherche avancée</h2>
                            <DateInput title="Choix d'un tirage précis" labels={["Date"]} filterTypes={["filter-result"]} dateToCompare={dateFilter} setDate={(date) => setDateFilter(date as Date | null)} />
                        </div>      
                        <div className="table-bloc">
                            <Pagination datas={dateFilter ? dataFiltered as [] : gameDatas[game.name] as []} currentPage={currentPage} setCurrentPage={setCurrentPage} paginatedNb={game && game.result.paginateNb as number} setCurrentData={setCurrentData} />

                            <Table page="result" datas={dateFilter ? dataFiltered : currentData} />

                            <Pagination datas={dateFilter ? dataFiltered as [] : gameDatas[game.name] as []} currentPage={currentPage} setCurrentPage={setCurrentPage} paginatedNb={game && game.result.paginateNb as number} setCurrentData={setCurrentData} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}