import { useEffect, useState } from "react";
import { FormatedDate } from "../../features/FormatedDate";
import { useSelector } from "react-redux";
import '../../css/Table.css';

export function TablePredict({ settings, datas, isFiltered, type }) {
    const { game } = useSelector(state => state.datas);

    if (datas.length > 0) {
        // const NbOfColumn = settings.title.reduce((acc, value) => acc + value.col, 0);

        return (
            <div className="table-container scrollable-table">
                <table>
                    <thead>
                        <tr>
                            {settings.title.map((title) => {
                                return (<th colSpan={title.col} key={title.name}>{title.name}</th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className={type === 'numbers' ? 'ball' : 'star'}>{item[0]}</div>
                                </td>
                                <td className='predict-data'>{item[1]}</td>
                                <td className='predict-data'>{item[2]}</td>
                                {/* <td><a href={`https://www.fdj.fr/jeux-de-tirage/euromillions-my-million/resultats/${FormatedDate(item.date).shortDate}`}>Détail</a></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        );
    } else {
        return (
            <p className='error'>Aucune donnée trouvée</p>
        )
    }
}