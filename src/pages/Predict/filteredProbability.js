export function filteredProbability(stats, filters) {
    // Vérification : si aucun filtre actif ou si filters est invalide, retourner les données d'origine
    if (!filters || Object.values(filters).every(order => order === null)) {
        console.warn("Aucun filtre actif. Les données sont retournées sans tri.");
        return stats;
    }

    // Valider et extraire les critères actifs (ignorer les colonnes nulles)
    const validOrder = ["croissant", "decroissant"];
    const activeFilters = Object.entries(filters).filter(([col, order]) => 
        validOrder.includes(order)
    );

    // Si aucun filtre actif valide n'existe, retourner les données inchangées
    if (activeFilters.length === 0) {
        console.warn("Aucun critère actif trouvé. Les données sont retournées sans tri.");
        return stats;
    }

    // Effectuer le tri en suivant les critères actifs
    const sortedStats = [...stats].sort((a, b) => {
        for (const [col, order] of activeFilters) {
            const columnIndex = parseInt(col, 10); // Convertir l'index en entier
            if (isNaN(columnIndex) || columnIndex >= a.length || columnIndex >= b.length) {
                console.error(`Index de colonne invalide : ${columnIndex}`);
                continue;
            }

            const comparison = order === "decroissant"
                ? b[columnIndex] - a[columnIndex]
                : a[columnIndex] - b[columnIndex];

            if (comparison !== 0) {
                return comparison; // Retourner dès qu'une différence est trouvée
            }
        }
        return 0; // Si toutes les colonnes triées sont égales, conserver l'ordre initial
    });

    return sortedStats;
}
