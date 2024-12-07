import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addData, updateIsCollected, updateGame, updateMaxNumber, updateMaxBonus, updateBonusDraw, updateNumberDraw, updateFilterResult, updateFirstFilterPredict, updateSecondFilterPredict } from "../../features/dataSlice";
import axios from "axios";
import { DescriptionGame } from "../../components/DescriptionGame";
import { Result } from "../Result/Result";
import { Predict } from "../Predict/Predict";
import { Loading } from "../../components/Loading";

export function Loto() {

    const dispatch = useDispatch();
    const { datas, isCollected } = useSelector((state) => state.datas);
    const [loading, setLoading] = useState(true);
    const { page } = useParams();

    return (
        <>
            {
                page === 'home' ?
                    <DescriptionGame/>
                : page === 'results' ?
                    <Result/>
                : page === 'predicts' ?
                    <Predict/>
                : <></>
            }
        </>
    )
}