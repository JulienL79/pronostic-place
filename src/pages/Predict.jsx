import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addData, updateIsCollected } from "../features/dataSlice";
import axios from "axios";
import { Loading } from "../components/Loading";

export function Predict() {
    const dispatch = useDispatch();
    const { datas, isCollected } = useSelector((state) => state.datas);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isCollected) {
            const collectData = async () => {
                try {
                    const response = await axios.get('https://euromillions.api.pedromealha.dev/draws');
                    dispatch(addData(response.data.reverse()));
                    dispatch(updateIsCollected());
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

    return(
        <div className="page">
            {console.log("🚀 ~ Predict ~ datas:", datas)}
        </div>
    )
}