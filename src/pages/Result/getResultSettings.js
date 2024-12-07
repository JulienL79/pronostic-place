export function getResultSettings(game) {

    let settings = {};
    if(game === 'euromillions') {
        settings = {
            game: 'euromillions',
            name: 'result',
            title: [{name:'Tirage', col:1}, {name:'Numéros', col:7}],
            paginate: 10
        }
    }
    return settings;
}