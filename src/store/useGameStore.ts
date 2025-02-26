import { create } from "zustand";

export interface IColumn {
    title: string,
    columnNb: string
}

export interface ITableSettings {
    columns: IColumn[],
    isPaginated: boolean,
    paginateNb: number
}

export interface IGameSetting {
    name: "loto" | "euromillions",
    result: ITableSettings,
    pronostic: ITableSettings,
    maxNumber: number,
    maxBonus: number,
    numberDraw: number,
    bonusDraw: number
}

interface IGameState {
    game: IGameSetting | null,
    isGameChoosen: boolean,
    setGame: (newGame: IGameSetting) => void,
    resetGame: () => void
}

export const useGameStore = create<IGameState>((set) => ({
    game: null,
    isGameChoosen: false,
    setGame: (newGame) => {
        set({ 
            game: newGame,
            isGameChoosen: true
        })
    },
    resetGame: () => {
        set({
            game: null,
            isGameChoosen: false
        });
    }
}))