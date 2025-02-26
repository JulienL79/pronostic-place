import { ReactNode } from "react";

interface IFormField {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    required: boolean;
    min?: number,
    step?: string
}

export interface IFormProps {
    fields: IFormField[]
    onSubmit: (data: { [key: string]: string }) => void
    buttonContent: ReactNode
}