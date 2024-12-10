import { useDispatch } from "react-redux"
import { updateRecentFilter } from "../features/dataSlice";
import { useEffect, useState } from "react";
import '../css/RecentFilter.css'

export function RecentFilter() {
    const [selectedValue, setSelectedValue] = useState(30);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateRecentFilter(selectedValue));
    }, [selectedValue])

    return (
        <div className='recent-filter'>
            <select name="recent-date" id="recent-date" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                <option value={10}>Le dernier mois</option>
                <option value={30}>Les 3 derniers mois</option>
                <option value={60}>Les 6 derniers mois</option>
            </select>
        </div>
    )
}