import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEndDatePredict, updateFilterResult, updateStartDatePredict } from '../features/dataSlice';
import '../css/DateInput.css';

export function DateInput({ type }) {
    const { game, filterResult, startDatePredict, endDatePredict } = useSelector(state => state.datas)
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();

    // Function to enable only Tuesdays (2) and Fridays (5)
    function enableOnlyGameDay(date) {
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const day = date.getDay();

        if (game === 'euromillions') {
            return day === 2 || day === 5; // Mardi / Vendredi
        } else if (game === 'loto') {
            return day === 1 || day === 3 || day === 6; // Lundi / Mercredi / Samedi
        }
    }

    useEffect(() => {
        // Initialize Flatpickr with the date filter
        flatpickr(`#${type}-input`, {
            dateFormat: "Y-m-d",        // Format: 2024-11-27
            altInput: true,            // Pretty display
            altFormat: "j F Y",       // Format: 27 November 2024
            allowInput: true,          // Allow manual typing
            disable: [
                function (date) {
                    return !enableOnlyGameDay(date); // Disable all days except Tuesdays and Fridays
                }
            ],
            locale: "fr", // Optional: French localization
            onChange: function (selectedDates, dateStr) {
                // Lorsque la date est changée, on appelle dispatch avec la valeur sélectionnée

                if (dateStr) {
                    setErrors(null);
                    // Si une date a été sélectionnée, on applique le filtre
                    if(type === 'filter-result') {
                        dispatch(updateFilterResult(dateStr));
                    } else if (type === 'start-date-predict') {
                        if(endDatePredict && new Date(endDatePredict) < new Date(dateStr)) {
                            setErrors('La date de début doit être antérieure à la date de fin')  
                        } else {
                            dispatch(updateStartDatePredict(dateStr));
                        }
                    } else if (type === 'end-date-predict') {
                        if(startDatePredict && new Date(startDatePredict) > new Date(dateStr)) {
                            setErrors('La date de fin doit être postérieure à la date de début')
                        } else {
                            dispatch(updateEndDatePredict(dateStr));
                        }
                    }
                }
            },
            onClose: function () {
                // Vérifier si l'input est vide à la fermeture du calendrier
                const inputElement = document.getElementById(`${type}-input`);
                if (inputElement && !inputElement.value.trim()) {
                    setErrors(null);
                    if (type === 'filter-result') {
                        dispatch(updateFilterResult(null));
                    } else if (type === 'start-date-predict') {
                        dispatch(updateStartDatePredict(null));
                    } else if (type === 'end-date-predict') {
                        dispatch(updateEndDatePredict(null));
                    }
                }
            }
        });

    }, [game, filterResult, startDatePredict, endDatePredict, errors, dispatch]);

    return (
        <>
            <div className="date-picker">
                <input type="text" id={`${type}-input`} placeholder="Selectionner une date" className={errors ? 'error-date' : null}/>
                {
                    errors ? 
                        <div className="error-date">{errors}</div>
                    :
                    <></>
                }
            </div>
        </>
    )
}