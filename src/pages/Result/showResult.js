export function showResult(datas, filter) {
    let dataToShow = [];

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

    if (datas) {
        if (filter) {
            const dataFiltered = filterByDate(datas, filter);
            dataToShow = dataFiltered;
        } else {
            dataToShow = datas;
        }
    }

    return dataToShow;
}