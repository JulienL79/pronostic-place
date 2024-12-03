import { Link } from "react-router-dom"
import '../css/Navbar.css'
import { useState } from "react"

export function Navbar() {
    const [game, setGame] = useState('euromillions');

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
                <Link to={`/euromillions/`} onClick={() => setGame('euromillions')} className={`game ${game === 'euromillions' ? 'selected' : null}`}>Euromillions</Link>
                <Link to={`/loto/`} onClick={() => setGame('loto')} className={`game ${game === 'loto' ? 'selected' : null}`}>Loto</Link>
            </nav>
        </header>
    )
}