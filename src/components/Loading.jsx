import '../css/Loading.css'

export function Loading() {
    return (
        <div className="loading-container">
            <div className="loader">
                <img src="./icon.png" alt="Logo" className="loading-image"/>
                <div className="spinner"></div>
            </div>
            <p className="loading-text">Chargement en cours</p>
        </div>
    )
}