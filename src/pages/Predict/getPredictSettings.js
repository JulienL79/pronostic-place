export function getPredictSettings(game) {

    let settings = {};
    if(game === 'euromillions') {
        settings = {
            name: 'predict',
            title: [{name:'Numéros', col:1}, {name:'Sorties', col:1}, {name:'% de sorties', col:1}],
        }
    }
    return settings;
}