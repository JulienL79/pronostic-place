import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function Predict() {
    const { datas } = useSelector((state) => state.datas);
    const { game } = useParams();

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);

    return(
        <div className="page">
            <h1>Pronostics {capitalizedGame}</h1>
            <p>Suite à créer...</p>
        </div>
    )
}