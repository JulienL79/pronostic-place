export function getPredictSettings(game) {

    let settings = {};
    if(game === 'euromillions' || game === 'loto') {
        settings = {
            name: 'predict',
            title: [{name:'Numéros', col:1}, {name:'Sorties*', col:1}, {name:'Forme générale*', col:1}, {name:'Forme actuelle**', col:1}, {name:'Écart favorable*', col:1}, {name:'Écart défavorable*', col:1}, {name:'Écart actuel', col:1}],
        }
    }
    return settings;
}