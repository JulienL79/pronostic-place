export function getPredictSettings(game) {

    let settings = {};
    if(game === 'euromillions') {
        settings = {
            name: 'predict',
            title: [{name:'Numéros', col:1}, {name:'Sorties*', col:1}, {name:'Forme générale*', col:1}, {name:'Forme actuelle**', col:1}, {name:'Écart moyen*', col:1}, {name:'Écart actuel', col:1}],
        }
    }
    return settings;
}