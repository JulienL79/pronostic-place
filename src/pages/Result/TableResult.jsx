import { useEffect, useState } from "react";
import { FormatedDate } from "../../features/FormatedDate";
import '../../css/Table.css'

export function TableResult({ settings, datas, isFiltered }) {
    const [currentPage, setCurrentPage] = useState(settings.paginate ? 1 : null);
    const itemsPerPage = settings.paginate;
    const game = settings.game;

    useEffect(() => {
        if(isFiltered) {
            setCurrentPage(1);
        }
    }, [isFiltered])

    if (currentPage && datas.length > 0) {

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
                <div className="table-container table">
                    <table>
                        <thead>
                            <tr>
                                {settings.title.map((title, index) => {
                                    return (<th colSpan={title.col} key={`title.name-${index}`}>{title.name}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, rowIndex) => (
                                <tr key={`raw-${rowIndex}`}>
                                    <td className='date'>{FormatedDate(item.date).fullDate}</td>
                                    {item.numbers.map((number, colIndex) => {
                                        return (
                                            <td key={`ball-${colIndex}-${rowIndex}-${number}`}>
                                                <div className={`ball ${game === 'euromillions' ? 'euromillions' : 'loto'}`}>{number}</div>
                                            </td>
                                        )
                                    })}
                                    {item.bonus.map((bonus, colIndex) => {
                                        return (
                                            <td key={`bonus-${colIndex}-${rowIndex}-${bonus}`}>
                                                <div className={`${game === 'euromillions' ? 'euromillions-bonus' : 'ball loto-bonus'}`}>{bonus}</div>
                                            </td>
                                        )
                                    })}
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