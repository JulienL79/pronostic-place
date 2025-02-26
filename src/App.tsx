import { Router } from "routes/Router"
import { useEffect } from "react"
import { InitialLoader } from "@atoms/InitialLoader"
import { Navbar } from "@molecules/Navbar"
import { INavItemProps } from "@atoms/NavItem"
import { awakeServer, fetchGameData } from "@api/gameApi"
import { useDataStore } from "@store/useDataStore"
import { useErrorStore } from "@store/useErrorStore"
import "./css-global/reset.css"
import "./css-global/main.css"
import { Footer } from "@molecules/Footer"

export const App = () => {
    const { isConnected, isFilled, connectToDataBase, addGameDatas, setIsFilled } = useDataStore()
    const { setError } = useErrorStore()

    const headerList : INavItemProps[] = [
        {to:"/information", content:"Loto", className:"game"},
        {to:"/information", content:"Euromillions", className:"game"}
    ]

    useEffect(() => {
        const connectServer = async () => {
            const response = await awakeServer()
            if(response.success) {
                connectToDataBase()
                console.log("Server Alive")
            } else {
                setError(response.message as string)
            }
        }

        if(!isConnected) {
            connectServer()
        }
        
    }, [isConnected]);

    useEffect(() => {
        const fetchData = async (gameName: "euromillions" | "loto") => {
            const response = await fetchGameData(gameName)

            if(response.success) {
                addGameDatas(gameName, response.success)
                return true
            } else {
                setError(response.message as string)
                return false
            }
        }

        const fetchAllData = async () => {
            const lotoDatas = await fetchData("loto");
            const euromillionsDatas = await fetchData("euromillions");
    
            if (lotoDatas && euromillionsDatas) {
                setIsFilled();
            }
        };

        if (isConnected && !isFilled) {
            fetchAllData();
        }

    }, [isConnected, isFilled])

    return (
        <>
            <InitialLoader/>

            <Navbar navLinks={headerList}/>
            <Router/>
            <Footer />
        </>
    )
}