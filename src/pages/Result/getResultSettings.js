export function getResultSettings(game) {

    let settings = {};
    if(game === 'euromillions') {
        settings = {
            game: 'euromillions',
            name: 'result',
            title: [{name:'Tirages', col:1}, {name:'Numéros', col:7}],
            paginate: 10
        }
    }
    if(game === 'loto') {
        settings = {
            game: 'loto',
            name: 'result',
            title: [{name:'Tirages', col:1}, {name:'Numéros', col:6}],
            paginate: 10
        }
    }
    return settings;
}