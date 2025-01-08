import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addData, updateIsCollected, updateMaxNumber, updateMaxBonus, updateBonusDraw, updateNumberDraw, updateFilterResult, updateStartDatePredict, updateEndDatePredict, updateRecentFilter, setUpdated } from "../features/dataSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const DataCollector = () => {
    const dispatch = useDispatch()
    const {isUpdate, game} = useSelector(state => state.datas)
    const maxNumber = game === 'euromillions' ? 50 : 49
    const maxBonus = game === 'euromillions' ? 12 : 10
    const bonusDraw = game === 'euromillions' ? 2 : 1
    const numberDraw = game === 'euromillions' ? 5 : 5

    const collectData = async () => {
        dispatch(updateIsCollected(false))
        try {
            console.log(API_URL)
            if (!isUpdate) {
                const updateData = await axios.get(`${API_URL}/update`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    }
                )
                if (updateData.status === 200) {
                    dispatch(setUpdated())
                    console.log('Server alive')
                } else {
                    throw new Error('Server not alive')
                }
            }

            const response = await axios.get(`${API_URL}/${game === 'euromillions' ? 'euromillions' : 'loto'}/draws`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            dispatch(updateMaxBonus(maxBonus));
            dispatch(updateMaxNumber(maxNumber));
            dispatch(updateBonusDraw(bonusDraw));
            dispatch(updateNumberDraw(numberDraw));
            dispatch(updateRecentFilter(3));
            dispatch(addData(response.data));
        } catch (err) {
            console.error(err);
            dispatch(updateIsCollected(true))
        }
    }

    useEffect(() => {
        collectData()
    }, [dispatch, game])

    return null
}

