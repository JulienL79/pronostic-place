import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { updateGame, updateIsCollected } from "../features/dataSlice"
import Icon from '/icon.png'
import '../css/Navbar.css'


export function Navbar() {
    const { game } = useSelector(state => state.datas)
    const dispatch = useDispatch();
    
    return (
        <header>
            <div className="header-container">
                <div className="navbar">
                    <Link className='no-link' to="/pronostic-place"><img className="logo" src={Icon} /></Link>
                    {
                        game ?
                            <nav className='big-nav'>
                                <Link to={`/pronostic-place/${game}/predicts`}>Pronostics</Link>
                                <Link to={`/pronostic-place/${game}/results`}>Résultats</Link>
                            </nav>
                            : null
                    }

                </div>
                <nav className="sub-nav">
                    <Link to={`/pronostic-place/euromillions/home`} onClick={() => dispatch(updateGame('euromillions'))} className={`game ${game === 'euromillions' ? 'selected' : null}`}>Euromillions</Link>
                    <Link to={`/pronostic-place/loto/home`} onClick={() => dispatch(updateGame('loto'))} className={`game ${game === 'loto' ? 'selected' : null}`}>Loto</Link>
                </nav>
            </div>
        </header>
    )
}