import { useErrorStore } from '@store/useErrorStore'
import { ErrorModal } from '@atoms/ErrorModal'

export function Home() {

    const { error, clearError } = useErrorStore()
    return (
        <div className="page home">
            <h1>Pronostic Place</h1>
            <section className="intro">
                <div className="container">
                    <p className="paragraph">
                        Vous cherchez les derniers résultats de l'<strong>Euromillions</strong> et du <strong>Loto</strong> ? Vous souhaitez
                        maximiser vos chances de remporter le gros lot grâce à des pronostics fiables et des
                        astuces de jeu ? Vous êtes au bon endroit !
                    </p>
                    <p className="paragraph">
                        <strong>Sur notre plateforme, découvrez :</strong>
                    </p>
                    <ul style={{marginBottom: '40px'}}>
                        <li><i className="fa-solid fa-right-long"></i> Les résultats en direct des tirages de l'Euromillions et du Loto</li>
                        <li><i className="fa-solid fa-right-long"></i> Des outils de pronostics pour vous aider à choisir vos numéros</li>
                        <li><i className="fa-solid fa-right-long"></i> Des statistiques détaillées pour analyser les tendances des tirages</li>
                    </ul>
                    <p className="paragraph">
                        Que vous soyez joueur occasionnel ou amateur passionné, nous avons tout ce qu'il vous
                        faut pour vivre pleinement votre expérience de jeu !
                    </p>
                </div>
            </section>
            {
                error ? <ErrorModal message={error} onClose={() => clearError()} /> : <></>
            }
        </div>
    )
}