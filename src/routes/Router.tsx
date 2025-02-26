import { Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import { PrivateRoute } from "./PrivateRoute"
import { Home } from "@pages/Home"
import { NotFound } from "@pages/Notfound"
import { GameInformation } from "@pages/GameInformation"
import { Result } from "@pages/Result/Result"
import { Pronostic } from "@pages/Pronostic/Pronostic"


export const Router = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Helmet>
                        <title>Pronostic Place - Résultats et pronostics</title>
                    </Helmet>
                    <Home />
                </>
            } />

            <Route element={<PrivateRoute />}>
                <Route path="/information" element={
                    <>
                        <GameInformation />
                    </>
                } />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/result" element={
                    <>
                        <Result />
                    </>
                } />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/pronostic" element={
                    <>
                        <Pronostic />
                    </>
                } />
            </Route>

            <Route path="*" element={
                <>
                    <Helmet>
                        <title>Page non trouvée</title>
                    </Helmet>
                    <NotFound/>
                </>
            } />
        </Routes>
    )
}