import { calculateProbabilities } from "./calculateProbabilities";

//Fonction qui retourne un tableau comme suit [nombre, nombre de sortie, taux de sortie global, taux de sortie sur période filtrée]
export function calculatePredict(allDatas, type, maxNumber, numberDraw, orderBy, firstFilter, secondFilter) {
    const numberOfDraws = allDatas.length;
    const normalProbabilityNumber = calculateProbabilities(maxNumber, numberDraw);

    // Étape 1 : Calculer le nombre de sortie de chaque nombre et faire un objet global
    const numberCount = allDatas
        .flatMap(data => type === "numbers" ? data.numbers : data.stars)
        .reduce((obj, number) => {
            obj[number] ? obj[number]++ : obj[number] = 1;
            return obj;
        }, {})

    // Étape 2 : Transformer l'objet en tableau et lui rajouter son taux de sortie
    const numberCountArray = Object.entries(numberCount)
        .map(([number, count]) => [number, count, (count / numberOfDraws * 100).toFixed(2)]) // [['8', 1, 20.99], ['17', 2, 23.34], ...]

    // Étape 3 : Appliquer les filtres
    const numberCountFiltered = numberCountArray.sort(([, valueA], [, valueB]) => orderBy === "decroissant" ? valueB - valueA : valueA - valueB);

    return numberCountFiltered;
}