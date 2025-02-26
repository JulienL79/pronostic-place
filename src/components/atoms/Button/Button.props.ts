import { ReactNode } from "react";

export interface IButtonProps {
    className?: string,
    content: ReactNode,
    isDisabled?: boolean,
    onClick?: (() => void)
}