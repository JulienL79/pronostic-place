import { useDispatch, useSelector } from "react-redux"
import { updateRecentFilter } from "../features/dataSlice";
import { useEffect, useState } from "react";
import '../css/RecentFilter.css'

export function RecentFilter() {
    // Récupère la valeur de RecentFilter du store Redux
    const RecentFilter = useSelector(state => state.datas.RecentFilter);
    const [selectedValue, setSelectedValue] = useState(30); // Initialise avec la valeur de Redux
    const dispatch = useDispatch();

    // Synchronise `selectedValue` avec `RecentFilter` à chaque changement du store Redux
    useEffect(() => {
        // Si la valeur de Redux change, on met à jour l'état local
        if (RecentFilter !== selectedValue) {
            setSelectedValue(RecentFilter); // Synchroniser les deux
        }
    }, [RecentFilter, selectedValue]);

    // Gère le changement de valeur de l'élément select
    const handleChange = (e) => {
        const newValue = Number(e.target.value);
        setSelectedValue(newValue); // Met à jour l'état local
        dispatch(updateRecentFilter(newValue)); // Met à jour Redux
    };

    return (
        <div className='recent-filter'>
            <select name="recent-date" id="recent-date" value={selectedValue} onChange={handleChange}>
                <option value={10}>Le dernier mois</option>
                <option value={30}>Les 3 derniers mois</option>
                <option value={60}>Les 6 derniers mois</option>
            </select>
        </div>
    )
}