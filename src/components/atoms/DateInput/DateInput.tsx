import React, { useState, useRef } from "react"
import { IDateInputProps } from "./DateInputProps"
import { useGameStore } from "@store/useGameStore"
import { useEffect } from "react"
import flatpickr from "flatpickr"
import { French } from "flatpickr/dist/l10n/fr.js"
import "flatpickr/dist/flatpickr.min.css"
import "./DateInput.css"

interface IError {
    filter: string,
    message: string
}

export const DateInput: React.FC<IDateInputProps> = ({
    title,
    labels,
    filterTypes,
    className,
    dateToCompare,
    setDate
}) => {
    const { game } = useGameStore()
    const [errors, setErrors] = useState<IError[]>([])

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(e.target.value)

        if(isNaN(newValue)) return

        let newDateFiltered = new Date()
        newDateFiltered.setMonth(newDateFiltered.getMonth() - newValue)
        setDate(newDateFiltered)
    };

    const flatpickrInstances = useRef<{ [key: string]: flatpickr.Instance | null }>({})
    // Function to enable according to Game
    function enableOnlyGameDay(date: Date) {
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const day = date.getDay();
        if (game?.name === "euromillions") return day === 2 || day === 5;
        if (game?.name === "loto") return day === 1 || day === 3 || day === 6;
    }

    useEffect(() => {
        if (!Array.isArray(filterTypes)) return;

        if (filterTypes[0] === "recent-filter-pronostic") return;

        filterTypes.forEach((filter) => {
            const inputElement = document.getElementById(`${filter}-input`) as HTMLInputElement;

            if (!inputElement) return;

            // Vérifier si une instance Flatpickr existe déjà pour cet input et la détruire avant d'en créer une nouvelle
            if (flatpickrInstances.current[filter]) {
                flatpickrInstances.current[filter]?.destroy();
            }

            // Création d'une nouvelle instance Flatpickr
            flatpickrInstances.current[filter] = flatpickr(inputElement, {
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "j F Y",
                allowInput: true,
                disable: [(date: Date) => !enableOnlyGameDay(date)],
                locale: French,
                onReady: () => {
                    inputElement.style.display = "none"; // Cache immédiatement l'input original
                },
                onChange: (selectedDates: Date[], dateStr: string) => {
                    if (!selectedDates) { }

                    if (dateStr) {
                        let newErrors = errors.filter((err) => err.filter !== filter);
                        const selectedDate = new Date(dateStr)
                        // Si une date a été sélectionnée, on applique le filtre
                        if (filter === "filter-result" && new Date() < selectedDate) {
                            newErrors.push({ filter, message: "Aucun tirage n'a encore eu lieu à cette date" });
                        } else {

                            // Si dateToCompare est une Date ou non défini
                            if (filter === "filter-result") {
                                setDate(selectedDate); // On met simplement la date sélectionnée
                            }

                            // Vérification du type de dateToCompare
                            if (dateToCompare && (dateToCompare as { start: Date | null; end: Date | null })) {
                                // C'est un objet avec start et end
                                const { start, end } = dateToCompare as { start: Date | null; end: Date | null };

                                if (filter === "start-date-pronostic" && end && end < selectedDate) {
                                    newErrors.push({ filter, message: "La date de début doit être antérieure à la date de fin" });
                                } else if (filter === "end-date-pronostic" && start && start > selectedDate) {
                                    newErrors.push({ filter, message: "La date de fin doit être postérieure à la date de début" });
                                } else {
                                    // Mise à jour des dates si aucune erreur n'est trouvée
                                    if (filter === "start-date-pronostic") {
                                        console.log("changement dans DateInput" + selectedDate)
                                        setDate({ ...dateToCompare, start: selectedDate });
                                    }
                                    if (filter === "end-date-pronostic") {
                                        console.log("changement dans DateInput" + selectedDate)
                                        setDate({ ...dateToCompare, end: selectedDate });
                                    }
                                }
                            } 
                        }

                        // Si des erreurs sont présentes, vider l'input
                        const instance = flatpickrInstances.current[filter];
                        if (instance) {
                            if (newErrors.length > 0) {
                                instance.altInput?.classList.add('error-filter');
                                instance.clear();
                            } else {
                                instance.altInput?.classList.remove('error-filter');
                            }
                        }

                        setErrors(newErrors);
                    }
                },
                onClose: () => {
                    const instance = flatpickrInstances.current[filter];
                    // Si l'input est vide, vider la date associée
                    if (instance && !instance.input.value.trim()) {
                        setErrors(errors.filter((err) => err.filter !== filter));
                        if (filter === "start-date-pronostic") {
                            setDate({ ...(dateToCompare ?? { start: null, end: null }), start: null });
                        }
                        if (filter === "end-date-pronostic") {
                            setDate({ ...(dateToCompare ?? { start: null, end: null }), end: null });
                        }
                        if (filter === "filter-result") {
                            setDate(null);
                        }
                        instance.clear(); // Vider l'input via l'instance Flatpickr
                        instance.altInput?.classList.remove('error-filter');
                    }
                }
            });
        });

        // Cleanup: Détruire les instances Flatpickr lors du démontage du composant
        return () => {
            Object.values(flatpickrInstances.current).forEach((instance) => {
                instance?.destroy();
            });
            flatpickrInstances.current = {};
        };
    }, [filterTypes]);


    return (
        <fieldset className={filterTypes[0] === "recent-filter-pronostic" ? "recent-filter-container" : "date-input-container" }>
            <legend>{title}</legend>
            {
                filterTypes.length > 0 && filterTypes.map((filter, index) => {
                    return (
                        <div key={filter} className={`search-date ${className ? className : ''}`}>
                            <p>{labels[index]}</p>
                            <div className="date-picker">
                                {
                                    filter === "recent-filter-pronostic" ?
                                        <select name="recent-filter-pronostic" id="recent-filter-pronostic" defaultValue={3} onChange={handleChange}>
                                            <option value={1}>Le dernier mois</option>
                                            <option value={3}>Les 3 derniers mois</option>
                                            <option value={6}>Les 6 derniers mois</option>
                                        </select>
                                    :
                                        <>
                                            <input type="text" id={`${filter}-input`} placeholder="Selectionner une date" className={errors.find((error) => error.filter === filter) ? 'error-filter' : ''} />
                                                { errors.find((error) => error.filter === filter) ?
                                                 <div className="error-date-container">
                                                    {errors.find((error) => error.filter === filter)?.message}
                                                </div>
                                                : <></>
                                            }
                                        </> 
                                }
                            </div>
                        </div>
                    )
                })
            }

        </fieldset>
    )
}