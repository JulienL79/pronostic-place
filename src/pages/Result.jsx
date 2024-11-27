import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addData, updateIsCollected } from "../features/dataSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Table } from "../components/Table";
import '../css/Result.css';
import { DateInput } from "../components/DateInput";
import { getSettings } from "../features/getSettings";

export function Result() {
    const dispatch = useDispatch();
    const { datas, isCollected } = useSelector((state) => state.datas);
    const [loading, setLoading] = useState(true);
    const [dataToShow, setDataToShow] = useState([]);
    const { game } = useParams();
    const [filter, setFilter] = useState(null);
    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);

    const tableSettings = getSettings(game);

    function filterByDate(data, filterDate) {
        // Convertir la date du filtre en objet Date
        const filterDateObject = new Date(filterDate);
    
        // Filtrer les données
        return data.filter(item => {
            // Convertir la date de l'objet en objet Date
            const itemDate = new Date(item.date);
    
            // Comparer les dates (la partie temps sera ignorée lors de la comparaison)
            return itemDate.setHours(0, 0, 0, 0) === filterDateObject.setHours(0, 0, 0, 0);
        });
    }
    

    useEffect(() => {
        if (datas) {
            if(filter) {
                const dataFiltered = filterByDate(datas, filter);
                setDataToShow(dataFiltered);
            } else {
                setDataToShow(datas);
            }
        }
    }, [datas, filter])

    useEffect(() => {
        if (!isCollected) {
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

    return (
        <div className="page">
            <h1>Résultats {capitalizedGame}</h1>

            <div className='result-div'>
                {loading ?
                    <Loading />
                    :
                    <>  
                        <div className="search-date">
                            <p>Vous recherchez un tirage précis?</p>
                            <DateInput game={game} setFilter={setFilter}/>
                        </div>
                        <Table settings={tableSettings} datas={dataToShow} page='result' />
                    </>
                }
            </div>
        </div>
    )
}