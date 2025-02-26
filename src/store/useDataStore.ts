import { create } from "zustand";

interface IData {
    _id: string,
    date: string,
    numbers: number[],
    bonus: number[],
    __v: number
}

interface IDataGame {
    euromillions: IData[],
    loto: IData[],
}

interface IDataState {
    isConnected : boolean,
    isFilled: Boolean,
    gameDatas: IDataGame,
    connectToDataBase: () => void,
    setIsFilled: () => void,
    addGameDatas: (game : "euromillions" | "loto", newDatas: IData[]) => void,
    resetDatas: () => void,
}

export const useDataStore = create<IDataState>((set) => ({
    isConnected: false,
    isFilled: false,
    gameDatas: {
        euromillions: [],
        loto: []
    },
    connectToDataBase: () => {
        set({ isConnected: true })
    },
    addGameDatas: (game, newDatas) => {
        set((state) => ({
            gameDatas: {
                ...state.gameDatas,
                [game]: newDatas
            }
        }))
    },
    setIsFilled: () => {
        set({
            isFilled: true
        })
    },
    resetDatas: () => {
        set({ 
            gameDatas: { euromillions: [], loto: [] },
            isFilled: false
        });
    }
}))