interface PaginationProps {
    numberOfItems: number,
    itemsPerPage: number,
    currentPage: number,
    setCurrentPage: (value: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({ numberOfItems, itemsPerPage, currentPage, setCurrentPage }) => {
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

    function changePage(pageNumber: number) {
        if (pageNumber !== currentPage)
            setCurrentPage(pageNumber);
    }

    function doesPagesOverflow(): boolean {
        return numberOfPages > 5;
    }

    function isCurrentPageNearBeginning(): boolean {
        return currentPage <= 3;
    }

    function isCurrentPageNearEnd(): boolean {
        return currentPage >= numberOfPages - 2;
    }

    function getPaginationBoundaries(): number[] {
        const pageNumbers: number[] = [];
        if (!doesPagesOverflow()) {
            for (let i = 1; i <= numberOfPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (isCurrentPageNearBeginning()) {
                pageNumbers.push(1, 2, 3, 4, numberOfPages);
            } else {
                pageNumbers.push(1);
                if (isCurrentPageNearEnd()) {
                    pageNumbers.push(numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
                } else {
                    pageNumbers.push(currentPage - 1, currentPage, currentPage + 1, numberOfPages);
                }
            }
        }
        return pageNumbers;
    }

    return (
        <div className="pagination-container d-flex">
            {currentPage > 1 &&
                <button onClick={() => changePage(currentPage - 1)} className="btn btn-outline-secondary">Précédent</button>
            }
            {(() => {
                const elements: JSX.Element[] = [];
                const listOfPageNumber = getPaginationBoundaries();
                for (let arrayIndex = 0; arrayIndex < listOfPageNumber.length; arrayIndex++) {
                    const currentPageNumber = listOfPageNumber[arrayIndex];
                    elements.push(
                        <div key={currentPageNumber}>
                            { doesPagesOverflow() && currentPageNumber === numberOfPages && listOfPageNumber[arrayIndex - 1] !== currentPageNumber - 1 &&
                                <span>...</span>
                            }
                            <button
                                className={`btn ${currentPageNumber === currentPage ? "active" : ""}`}
                                onClick={() => changePage(currentPageNumber)}
                            >
                                {currentPageNumber}
                            </button>
                            { doesPagesOverflow() && currentPageNumber === 1 && listOfPageNumber[arrayIndex + 1] !== currentPageNumber + 1 &&
                                <span>...</span>
                            }
                        </div>
                    );
                }

                return elements;
            })()}
            {currentPage !== numberOfPages &&
                <button onClick={() => changePage(currentPage + 1)} className="btn btn-outline-secondary">Suivant</button>
            }
        </div>
    )
}

export default Pagination;