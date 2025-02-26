import { IStatNumber, IFilter } from "./Pronostic"

export const filteredProbability = (stats : IStatNumber[], filters : IFilter) : IStatNumber[] => {
    // Vérification : si aucun filtre actif ou si filters est invalide, retourner les données d'origine
    if (!filters || Object.values(filters).every(order => order === null)) {
        console.warn("Aucun filtre actif. Les données sont retournées sans tri.")
        return stats
    }

    // Valider et extraire les critères actifs (ignorer les colonnes nulles)
    const validOrder = ["croissant", "decroissant"];
    const activeFilters = Object.entries(filters).filter(([_, order]) => validOrder.includes(order));

    // Si aucun filtre actif valide n'existe, retourner les données inchangées
    if (activeFilters.length === 0) {
        console.warn("Aucun critère actif trouvé. Les données sont retournées sans tri.");
        return stats;
    }

    // Effectuer le tri en suivant les critères actifs
    const sortedStats = [...stats].sort((a, b) => {
        for (const [property, order] of activeFilters) {
            if (!(property in a) || !(property in b)) {
                console.error(`Propriété invalide : ${property}`);
                continue;
            }

            const comparison = order === "decroissant"
                ? b[property] - a[property]
                : a[property] - b[property];

            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    });

    return sortedStats;
}
