export interface IInputProps {
    id: string,
    className?: string,
    value?: string | number,
    type: string,
    placeholder: string,
    required?: boolean,
    min?: number,
    step?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}