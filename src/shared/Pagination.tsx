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

    function isCurrentPageNearEnd(): boolean {
        return currentPage >= numberOfPages - 2;
    }

    function getPaginationBoundaries(): number[] {
        const pageNumbers: number[] = [];
        if (!doesPagesOverflow()) {
            for (let i = 1; i <= numberOfPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        } else {
            if (isCurrentPageNearEnd()) {
                for (let i = numberOfPages - 4; i <= numberOfPages; i++) {
                    pageNumbers.push(i);
                }
                return pageNumbers;
            } else {
                if (currentPage < 3) {
                    pageNumbers.push(
                        1,
                        2,
                        3,
                        4,
                        numberOfPages
                    )
                    return pageNumbers;
                }

                if (currentPage >= 3 && currentPage < numberOfPages - 2) {
                    pageNumbers.push(
                        currentPage - 2,
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        numberOfPages
                    )
                    return pageNumbers;
                }
            }

            return pageNumbers;
        }

    }

    return (
        <div className="pagination-container">
            {currentPage > 1 &&
                <button onClick={() => changePage(currentPage - 1)} className="btn btn-outline-secondary">Précédent</button>
            }
            {(() => {
                const elements: JSX.Element[] = [];
                const listOfPageNumber = getPaginationBoundaries();
                for (let arrayIndex = 0; arrayIndex < listOfPageNumber.length; arrayIndex++) {
                    if (!isCurrentPageNearEnd() && doesPagesOverflow() && arrayIndex == listOfPageNumber.length - 1) {
                        elements.push(
                            <span>...</span>
                        )
                    }

                    const currentPageNumber = listOfPageNumber[arrayIndex];
                    elements.push(
                        <button
                            className={`btn ${currentPage === currentPageNumber ? 'active' : ''}`}
                            onClick={() => changePage(currentPageNumber)}
                            key={currentPageNumber}>{currentPageNumber}</button>
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