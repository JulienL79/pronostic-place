import { useSelector } from 'react-redux';
import '../css/Loading.css'
import Logo from '/icon.png'

export function Loading() {
    const { isUpdate, isCollected } = useSelector((state) => state.datas);
    return (
        <div className="loading-container">
            <div className="loader">
                <img src={Logo} alt="Logo" className="loading-image"/>
                <div className="spinner"></div>
            </div>
            <p className="loading-text">Chargement en cours</p>
            {
                !isUpdate ?
                    <p className="small-text">En attente du réveil du serveur <br/>&#40;<em>Cette opération peut prendre plusieurs minutes</em>&#41;</p>
                :
                    <></>
            }
        </div>
    )
}