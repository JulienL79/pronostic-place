import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addData, updateIsCollected, updateGame, updateMaxNumber, updateMaxBonus, updateBonusDraw, updateNumberDraw, updateFilterResult, updateStartDatePredict, updateEndDatePredict, updateRecentFilter } from "../../features/dataSlice";
import axios from "axios";
import { DescriptionGame } from "../../components/DescriptionGame";
import { Result } from "../Result/Result";
import { Predict } from "../Predict/Predict";
import { Loading } from "../../components/Loading";

export function Euromillions() {

    const dispatch = useDispatch();
    const { datas, isCollected, game } = useSelector((state) => state.datas);
    const [loading, setLoading] = useState(true);
    const { page } = useParams();

    useEffect(() => {
        if(!isCollected && game === 'euromillions') {
            const collectData = async () => {
                try {
                    const response = await axios.get('https://euromillions.api.pedromealha.dev/draws');
                    dispatch(addData(response.data.reverse()));
                    dispatch(updateMaxBonus(12));
                    dispatch(updateMaxNumber(50));
                    dispatch(updateBonusDraw(2));
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

            collectData();
        } else {
            setLoading(false);
        }
    }, [isCollected, dispatch])

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