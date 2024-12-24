import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addData, updateIsCollected, updateMaxNumber, updateMaxBonus, updateBonusDraw, updateNumberDraw, updateFilterResult, updateStartDatePredict, updateEndDatePredict, updateRecentFilter, setUpdated } from "../../features/dataSlice";
import axios from "axios";
import { DescriptionGame } from "../../components/DescriptionGame";
import { Result } from "../Result/Result";
import { Predict } from "../Predict/Predict";
import { Loading } from "../../components/Loading";

export function Loto() {

    const dispatch = useDispatch();
    const { datas, isCollected, game, isUpdate } = useSelector((state) => state.datas);
    const [loading, setLoading] = useState(true);
    const { page } = useParams();

    const collectData = async () => {
        setLoading(true)
        try {
            if(!isUpdate) {
                const updateData = await axios.get('https://pronostic-place-backend.onrender.com/api/update')
                if(updateData.status === 200) {
                    dispatch(setUpdated())
                    console.log('Server alive')
                }  else {
                    throw new Error ('Server not alive')
                }
            }
            const response = await axios.get('https://pronostic-place-backend.onrender.com/api/loto/draws');
            dispatch(addData(response.data));
            dispatch(updateMaxBonus(10));
            dispatch(updateMaxNumber(49));
            dispatch(updateBonusDraw(1));
            dispatch(updateNumberDraw(5));
            dispatch(updateFilterResult(null));
            dispatch(updateRecentFilter(30));
            dispatch(updateStartDatePredict(null));
            dispatch(updateEndDatePredict(null));
            dispatch(updateIsCollected(true));
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        collectData();
    }, [game])

    if(loading) {
        return(
            <div className="page">
                <Loading/>
            </div>
        )
    }

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