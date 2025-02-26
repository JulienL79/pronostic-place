import { IData } from "../../../types/Data";

export const filteredDraws = (draws: IData[], startDate : Date, endDate: Date) : IData[] => {
    const filteredDraws = draws.filter(draw => {
        const drawDate = new Date(draw.date)
        return drawDate >= startDate && drawDate <= endDate
    });

    return filteredDraws;
}