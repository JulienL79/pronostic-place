import axios from "axios";
import { IData } from "./../types/Data";

const API_URL = import.meta.env.VITE_API_URL;

export const awakeServer = async (): Promise<{ success: boolean; message?: string }> => {
    try {
        await axios.get(`${API_URL}/update`)
        return { success: true }
    } catch (error) {
        console.error("Erreur API :", error)
        return {
            success: false,
            message: "Le serveur est injoignable. Veuillez réessayer plus tard."
        }
    }
}

export const fetchGameData = async (game: string): Promise<{ success: IData[] | false ; message?: string }> => {
    try {
        const response = await axios.get(`${API_URL}/${game}/draws`)
        const datas : IData[] = response.data
        return { success: datas }
    } catch (error) {
        console.error("Erreur API :", error)
        return {
            success: false,
            message: "Erreur lors de la récupération des données"
        }
    }
}