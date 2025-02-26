export interface IDateInputProps {
    title: string,
    labels: string[],
    filterTypes: string[]
    className?: string,
    dateToCompare: {start : Date | null, end: Date | null} | Date | null
    setDate: (date: {start : Date | null, end: Date | null} | Date | null) => void
}