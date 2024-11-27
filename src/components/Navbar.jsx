import { Link } from "react-router-dom"
import '../css/Navbar.css'
import { useState } from "react"

export function Navbar() {
    const [game, setGame] = useState('euromillions');

    return (
        <header>
            <div className="navbar">
                <img className="logo" src="./icon.png" />
                <nav className='big-nav'>
                    <Link to={`/${game}`}>Pronostics</Link>
                    <Link to={`/${game}/results`}>Résultats</Link>
                </nav>
            </div>
            <nav className="sub-nav">
                <p onClick={() => setGame('euromillions')} className={`game ${game === 'euromillions' ? 'selected' : null}`}>Euromillions</p>
                <p onClick={() => setGame('loto')} className={`game ${game === 'loto' ? 'selected' : null}`}>Loto</p>
            </nav>
        </header>
    )
}