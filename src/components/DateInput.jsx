import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DateInput.css'

export function DateInput({ setFilter }) {
    const { game } = useParams();

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
        flatpickr("#date-input", {
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
            onChange: function (selectedDates, dateStr, instance) {
                // Lorsque la date est changée, on appelle setFilter avec la valeur sélectionnée
                if (dateStr) {
                    // Si une date a été sélectionnée, on applique le filtre
                    setFilter(dateStr);
                }
            }
        });
    }, [game, setFilter])

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (!value) {
            // Si l'input est vide, on réinitialise le filtre
            setFilter(null);
        }
    };

    return (
        <>
            <div className="date-picker">
                <input onInput={handleInputChange} type="text" id="date-input" placeholder="Selectionner une date" />
            </div>
        </>
    )
}