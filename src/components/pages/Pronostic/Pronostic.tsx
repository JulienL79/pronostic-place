import { useGameStore } from "@store/useGameStore";
import { capitalizeFirstChar } from "@utils/StringConverter";
import { Helmet } from "react-helmet";
import { ParagraphInfo } from "@atoms/ParagraphInfo";
import { DateInput } from "@atoms/DateInput";
import { useEffect, useState } from "react";
import { useDataStore } from "@store/useDataStore";
import { calculatePronostics } from "./calculatePronostics.ts";
import { calculateStat } from "./calculateStat.ts";
import { Table } from "@atoms/Table/Table.tsx";
import { Number } from "@atoms/Number/Number.tsx";
import { Loader } from "@molecules/Loader/Loader.tsx";
import "./Pronostic.css"

export interface IFilter {
    number: "croissant" | "decroissant" | null,
    numberCount: "croissant" | "decroissant" | null,
    generalStat: "croissant" | "decroissant" | null,
    currentStat: "croissant" | "decroissant" | null,
    bestGap: "croissant" | "decroissant" | null,
    worthGap: "croissant" | "decroissant" | null,
    currentGap: "croissant" | "decroissant" | null
}

export interface IStatNumber {
    number: number,
    numberCount: number,
    generalStat: number,
    currentStat: number,
    bestGap: number,
    worthGap: number,
    currentGap: number,
    totalDraws: number,
    [key: string]: number
}

type PredictResult = [number, number][]; // Tableau de paires [numéro, score]
type PredictOutput = [PredictResult, PredictResult] | null; // Peut être null si game est undefined

export const Pronostic = () => {
    const { game } = useGameStore()
    const { gameDatas, isConnected, isFilled } = useDataStore()
    const [dateFilter, setDateFilter] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null })
    const [numberDatas, setNumberDatas] = useState<IStatNumber[] | null>()
    const [bonusDatas, setBonusDatas] = useState<IStatNumber[] | null>()
    const [pronosticNumbers, setPronosticNumbers] = useState<PredictOutput | null>()
    const [recentFilter, setRecentFilter] = useState<Date>(() => {
        const newDate = new Date()
        newDate.setMonth(newDate.getMonth() - 3)
        return newDate
    })

    useEffect(() => {
        if (game) {
            const newPronostics = calculatePronostics(game, gameDatas[game.name], dateFilter.start ?? new Date('0001-01-01T00:00:00Z'), dateFilter.end ?? new Date(), recentFilter)
            const newNumberDatas = calculateStat(
                gameDatas[game.name],
                "numbers",
                game.maxNumber,
                game.numberDraw,
                dateFilter.start ?? new Date('0001-01-01T00:00:00Z'),
                dateFilter.end ?? new Date(),
                recentFilter
            )
            const newBonusDatas = calculateStat(
                gameDatas[game.name],
                "bonus",
                game.maxBonus,
                game.bonusDraw,
                game.name === 'euromillions' && (!dateFilter.start || dateFilter.start < new Date("2016-09-27")) ? new Date("2016-09-27") : dateFilter.start ?? new Date('0001-01-01T00:00:00Z'),
                dateFilter.end ?? new Date(),
                recentFilter
            )
            setPronosticNumbers(newPronostics)
            setNumberDatas(newNumberDatas)
            setBonusDatas(newBonusDatas)
        }
    }, [game, gameDatas, dateFilter, recentFilter])

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

    return (
        <>
            <Helmet>
                <title>{game && capitalizeFirstChar(game.name)} - Pronostics</title>
            </Helmet>
            <div className="page">

                <h1>{game && capitalizeFirstChar(game.name)} : Nos prédictions</h1>

                <div>
                    <h2>Nos pronostics</h2>

                    <p className="paragraph">Notre logique de calcul des pronostics repose sur l'analyse statistique des données récentes pour évaluer les numéros et bonus en fonction de leur <strong>forme générale, leurs écarts, et leur forme actuelle</strong>, afin de sélectionner les options les plus pertinentes selon un système de <strong>scores pondérés</strong>.</p>
                    {
                        pronosticNumbers ?
                            <div className="split center">
                                
                                <div className="pronostics">
                                    {
                                        pronosticNumbers[0].map((number) => {
                                            return <Number key={`result-number-${number[0]}`} data={number[0]} type="number" />
                                        })
                                    }
                                </div>

                                <div className="pronostics">
                                    {
                                        pronosticNumbers[1].map((number) => {
                                            return <Number key={`result-bonus-${number[0]}`} data={number[0]} type="bonus" />
                                        })
                                    }
                                </div>
                            </div>
                        :
                            <>
                            </>
                    }

                </div>

                <ParagraphInfo type="pronostic" />

                <div className="split">
                    <div className="filter-bloc">
                        <h2 style={{textAlign: "center"}}>Recherche avancée</h2>
                        <DateInput title="Période générale *" labels={["Date de début", "Date de fin"]} filterTypes={["start-date-pronostic", "end-date-pronostic"]} dateToCompare={dateFilter} setDate={(dates) => setDateFilter(dates as { start: Date | null, end: Date | null })} />
                        <DateInput title="Période récente **" labels={["Période"]} filterTypes={["recent-filter-pronostic"]} dateToCompare={null} setDate={(date) => setRecentFilter(date as Date)} />
                    </div>
                    {
                        numberDatas && bonusDatas ?
                            <div className="table-bloc">
                                <h2 style={{textAlign: "center"}}>Statistiques des numéros principaux</h2>
                                <Table page="pronostic" datas={{ type: "numbers", datas: numberDatas }} />

                                <h2 style={{textAlign: "center"}}>Statistiques des numéros bonus</h2>
                                <Table page="pronostic" datas={{ type: "bonus", datas: bonusDatas }} />
                            </div>
                            :
                            <div>

                            </div>
                    }
                </div>

                <h2 style={{ textAlign: 'left' }}>Explications</h2>

                {
                    numberDatas 
                    ?
                        <p className="paragraph">
                            Le numéro principal n°<strong>{numberDatas[0].number}</strong> a été tiré <strong>{numberDatas[0].numberCount}</strong> fois sur les <strong>{numberDatas[0].totalDraws}</strong> tirages de la période générale* (par défaut la totalité des tirages).
                            Sur cette période, ce numéro est sorti majoritairement tous les <strong>{numberDatas[0].bestGap}</strong> tirage(s), et il est le plus rarement sorti aux alentours des <strong>{numberDatas[0].worthGap}</strong> tirage(s). Actuellement il n'est pas apparu depuis <strong>{numberDatas[0].currentGap}</strong> tirage(s). Son taux de sortie est <strong>{numberDatas[0].generalStat > 0 ? `supérieur de ${numberDatas[0].generalStat}` : `inférieur de ${-numberDatas[0].generalStat}`}%</strong> à la probabilité de sortie normale sur la période générale* et il est <strong>{numberDatas[0].currentStat > 0 ? `supérieur de ${numberDatas[0].currentStat}` : `inférieur de ${-numberDatas[0].currentStat}`}%</strong> sur la période récente**.
                        </p>
                    :
                    <></>
                }
                

            </div>
        </>
    )
}