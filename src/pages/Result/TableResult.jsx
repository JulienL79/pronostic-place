import { useEffect, useState } from "react";
import { FormatedDate } from "../../features/FormatedDate";
import '../../css/Table.css'

export function TableResult({ settings, datas, isFiltered }) {
    const isPaginated = settings.paginate ? true : false;
    const game = settings.game;

    if (isPaginated && datas.length > 0) {
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = settings.paginate;
        // const NbOfColumn = settings.title.reduce((acc, value) => acc + value.col, 0);

        // Calculer les index pour la pagination
        const totalPages = Math.ceil(datas.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = datas.slice(startIndex, endIndex);

        // Gérer les changements de page
        const goToFirstPage = () => {
            if (currentPage > 1) setCurrentPage(1);
        };
        const goToNextPage = () => {
            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        };

        const goToPreviousPage = () => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
        };
        const goToLastPage = () => {
            if (currentPage < totalPages) setCurrentPage(totalPages);
        };

        useEffect(() => {
            if(isFiltered) {
                setCurrentPage(1);
            }
        }, [isFiltered])

        return (
            <div>
                <div className="pagination-controls">
                    <button className='paginate-btn' onClick={goToFirstPage} disabled={currentPage === 1}>
                        1
                    </button>
                    <button className='paginate-btn' onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <i className="fa-solid fa-backward"></i>
                    </button>
                    <span className='paginate-btn'>
                        {currentPage}
                    </span>
                    <button className='paginate-btn' onClick={goToNextPage} disabled={currentPage === totalPages}>
                        <i className="fas fa-forward"></i>
                    </button>
                    <button className='paginate-btn' onClick={goToLastPage} disabled={currentPage === totalPages}>
                        {totalPages}
                    </button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {settings.title.map((title) => {
                                    return (<th colSpan={title.col} key={title.name}>{title.name}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td className='date'>{FormatedDate(item.date).fullDate}</td>
                                    {item.numbers.map((number, index) => {
                                        return (
                                            <td key={`ball-${index}`}>
                                                <div className="ball">{number}</div>
                                            </td>
                                        )
                                    })}
                                    {item.stars.map((star, index) => {
                                        return (
                                            <td key={`star-${index}`}>
                                                <div className="star">{star}</div>
                                            </td>
                                        )
                                    })}
                                    {/* <td><a href={`https://www.fdj.fr/jeux-de-tirage/euromillions-my-million/resultats/${FormatedDate(item.date).shortDate}`}>Détail</a></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-controls">
                    <button className='paginate-btn' onClick={goToFirstPage} disabled={currentPage === 1}>
                        1
                    </button>
                    <button className='paginate-btn' onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <i className="fa-solid fa-backward"></i>
                    </button>
                    <span className='paginate-btn'>
                        {currentPage}
                    </span>
                    <button className='paginate-btn' onClick={goToNextPage} disabled={currentPage === totalPages}>
                        <i className="fas fa-forward"></i>
                    </button>
                    <button className='paginate-btn' onClick={goToLastPage} disabled={currentPage === totalPages}>
                        {totalPages}
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <p className='error'>Aucune donnée trouvée</p>
        )
    }
}