interface PaginationProps {
    numberOfItems: number,
    itemsPerPage: number,
    currentPage: number,
    setCurrentPage: (value: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({ numberOfItems, itemsPerPage, currentPage, setCurrentPage }) => {
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

    function changePage(pageNumber: number) {
        if(pageNumber !== currentPage)
            setCurrentPage(pageNumber);
    }

    return (
        <div className="pagination-container">
            { currentPage > 1 &&
                <button onClick={() => changePage(currentPage -1)} className="btn btn-outline-secondary">Précédent</button>
            }
            {(() => {
                const elements = [];
                for (let i = 1; i <= numberOfPages; i++) {
                    elements.push(
                        <button
                            className={`btn ${currentPage === i ? 'active' : ''}`}
                            onClick={() => changePage(i)}
                            key={i}>{i}</button>
                    );
                }
                return elements;
            })()}
            { currentPage !== numberOfPages &&
                <button onClick={() => changePage(currentPage + 1)} className="btn btn-outline-secondary">Suivant</button>
            }
        </div>
    )
}

export default Pagination;