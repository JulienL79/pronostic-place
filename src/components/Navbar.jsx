import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { updateGame } from "../features/dataSlice"
import '../css/Navbar.css'


export function Navbar() {
    const { game } = useSelector(state => state.datas)
    const dispatch = useDispatch();

    return (
        <header>
            <div className="navbar">
                <img className="logo" src="./icon.png" />
                {
                    game ?
                        <nav className='big-nav'>
                            <Link to={`/${game}/predicts`}>Pronostics</Link>
                            <Link to={`/${game}/results`}>Résultats</Link>
                        </nav>
                        : null
                }

            </div>
            <nav className="sub-nav">
                <Link to={`/euromillions/home`} onClick={() => dispatch(updateGame('euromillions'))} className={`game ${game === 'euromillions' ? 'selected' : null}`}>Euromillions</Link>
                <Link to={`/loto/home`} onClick={() => dispatch(updateGame('loto'))} className={`game ${game === 'loto' ? 'selected' : null}`}>Loto</Link>
            </nav>
        </header>
    )
}