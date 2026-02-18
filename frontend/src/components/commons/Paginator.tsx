interface PaginationProps {
    currentPage: number;
    totalPages: number;
    startPage: number;
    endPage: number;
}

interface PaginatorResponseProps {
    data: PaginationProps;
    setCurrentPage: (page: number) => void;
}

const Paginator = ({data, setCurrentPage}: PaginatorResponseProps) => {
    const {currentPage, totalPages, startPage, endPage} = data;
    let pageArray = []

    const pageChange = (page:number) => setCurrentPage(page);

    if (startPage > 1) {
        pageArray.push(
            <button onClick = {() => pageChange(startPage - 1)} key={startPage - 1}>&lt;</button>
        )
    }

    for (let i:number = startPage; i <= endPage; i++) {
        pageArray.push(
            <button onClick = {() => pageChange(i)} key={i}
                    className={i === currentPage ? "board-page-active": ""}>{i}</button>
        )
    }

    if (endPage < totalPages) {
        pageArray.push(
            <button onClick = {() => pageChange(endPage + 1)} key={endPage + 1}>&gt;</button>
        )
    }
    return (
        <div className="board-pagination">
            {pageArray}
        </div>
    )
}

export default Paginator;