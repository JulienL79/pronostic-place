import { ReactNode } from "react"

export interface IFormFieldProps {
        label: ReactNode,
        id: string,
        value?: string | number,
        type: string,
        placeholder: string,
        required?: boolean,
        min?: number,
        step?: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        className?: string
}