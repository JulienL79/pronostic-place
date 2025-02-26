import { IGameSetting } from "@store/useGameStore"

export const getGameSettings = (game : string): IGameSetting => {
    let settings = {}
    
    if(game === 'euromillions') {

        settings = {
            name: 'euromillions',
            result: {columns:[{title:'Tirages', columnNb:"1"}, {title:'Numéros', columnNb:"2"}], isPaginated: true, paginateNb: 20 },
            pronostic: {columns:[{title:'Numéros', columnNb:"1"}, {title:'Sorties*', columnNb:"1"}, {title:'Forme générale*', columnNb:"1"}, {title:'Forme actuelle**', columnNb:"1"}, {title:'Écart favorable*', columnNb:"1"}, {title:'Écart défavorable*', columnNb:"1"}, {title:'Écart actuel', columnNb:"1"}], isPaginated: false, paginateNb: 20},
            maxNumber: 50,
            maxBonus: 12,
            numberDraw: 5,
            bonusDraw: 2
        }
    }

    if(game === 'loto') {

        settings = {
            name: 'loto',
            result: {columns:[{title:'Tirages', columnNb:"1"}, {title:'Numéros', columnNb:"2"}], isPaginated: true, paginateNb: 20 },
            pronostic: {columns:[{title:'Numéros', columnNb:"1"}, {title:'Sorties*', columnNb:"1"}, {title:'Forme générale*', columnNb:"1"}, {title:'Forme actuelle**', columnNb:"1"}, {title:'Écart favorable*', columnNb:"1"}, {title:'Écart défavorable*', columnNb:"1"}, {title:'Écart actuel', columnNb:"1"}], isPaginated: false, paginateNb: 20},
            maxNumber: 49,
            maxBonus: 10,
            numberDraw: 5,
            bonusDraw: 1
        }
    }

    return settings as IGameSetting;
}