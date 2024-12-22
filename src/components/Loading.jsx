import '../css/Loading.css'
import Logo from '/icon.png'

export function Loading() {
    return (
        <div className="loading-container">
            <div className="loader">
                <img src={Logo} alt="Logo" className="loading-image"/>
                <div className="spinner"></div>
            </div>
            <p className="loading-text">Chargement en cours</p>
        </div>
    )
}