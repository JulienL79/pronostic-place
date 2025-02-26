export interface IDataResult {
    _id: string,
    date: string,
    numbers: number[],
    bonus: number[],
    __v: number
}

export interface IDataStat {
    number: number,
    numberCount: number,
    generalStat: number,
    currentStat: number,
    bestGap: number,
    worthGap: number,
    currentGap: number,
    totalDraws: number,
    [key: string]: number
}

interface ITablePropsResult {
    page: "result",
    datas: IDataResult[]
}

export interface ITablePropsStat {
    page: "pronostic",
    datas: {
        type: "numbers" | "bonus"
        datas: IDataStat[]
    }
}
export type ITableProps = ITablePropsResult | ITablePropsStat