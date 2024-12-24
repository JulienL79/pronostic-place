import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addData, updateIsCollected, updateMaxNumber, updateMaxBonus, updateBonusDraw, updateNumberDraw, updateFilterResult, updateStartDatePredict, updateEndDatePredict, updateRecentFilter, setUpdated } from "../../features/dataSlice";
import axios from "axios";
import { DescriptionGame } from "../../components/DescriptionGame";
import { Result } from "../Result/Result";
import { Predict } from "../Predict/Predict";
import { Loading } from "../../components/Loading";
import { DataCollector } from "../../tasks/collectData";

export function Euromillions() {

    const dispatch = useDispatch();
    const { datas, isCollected, game, isUpdate } = useSelector((state) => state.datas);
    const { page } = useParams();

    useEffect(() => {
        dispatch(updateIsCollected(false))
    }, [game])

    if (!isCollected) {
        return (
            <div className="page">
                <DataCollector />
                <Loading />
            </div>
        )
    }

    return (
        <>
            {
                page === 'home' ?
                    <DescriptionGame />
                    : page === 'results' ?
                        <Result />
                        : page === 'predicts' ?
                            <Predict />
                            : <></>
            }
        </>
    )
}