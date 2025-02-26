import { ReactNode } from "react"

export interface INavItemProps {
    to: string,
    content: ReactNode,
    className?: string
    onClick?: (game: string) => void
}