import {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import boardClient from "../../components/commons/boardClient";
import {AxiosResponse} from "axios";
import Paginator from "../../components/commons/Paginator";

interface BoardProps {
    no: number;
    subject: string;
    name: string;
    dbday: string;
    hit: number;
}

interface BoardListResponse {
    boardList: BoardProps[];
    currentPage: number;
    totalPages: number;
    startPage: number;
    endPage: number;
}

export default function Board() {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {data, error, isError, isLoading} = useQuery<AxiosResponse<BoardListResponse>>({
        queryKey: ['board-list', currentPage],
        queryFn: async () => await boardClient.get(`/board/nodeList?page=${currentPage}`)
    });

    if (isLoading) {
        return <h1 className={"text-center"}>로딩 중...</h1>;
    }

    if (isError) {
        console.error(error);
        return <h1>에러 발생</h1>;
    }

    if (!data) {
        return null;
    }

    return (
        <Fragment>
        <div className="board-container">
            <h2 className="board-title">자유게시판</h2>

            {/* 상단 검색/버튼 영역 */}
            <div className="board-top">
                <Link className="btn board-write-btn" to={"/board/write"}>글쓰기</Link>
            </div>

            {/* 게시글 목록 */}
            <table className="board-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.data.boardList.map((board: BoardProps) =>
                        <tr key={board.no}>
                            <td>{board.no}</td>
                            <td className="board-title-link">
                                <Link to={`/board/detail/${board.no}`} className="board-title-link-text">
                                    {board.subject}
                                </Link>
                            </td>
                            <td>{board.name}</td>
                            <td>{board.dbday}</td>
                            <td>{board.hit}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <Paginator data={data.data} setCurrentPage={setCurrentPage} />
        </div>
        </Fragment>
    );
}
