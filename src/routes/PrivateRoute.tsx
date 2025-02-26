import { Navigate, Outlet } from "react-router-dom"
import { useGameStore } from "@store/useGameStore"

export const PrivateRoute = () => {
    const { isGameChoosen } = useGameStore()

    return isGameChoosen ? <Outlet /> : <Navigate to="/" />
}