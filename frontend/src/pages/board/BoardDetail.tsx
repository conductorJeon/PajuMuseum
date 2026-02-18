import {Link, useNavigationType} from "react-router-dom";
import {Fragment, useRef, useState} from "react";
import {useParams} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import boardClient from "../../components/commons/boardClient";
import {AxiosError, AxiosResponse} from "axios";
import Commentor from "../../components/commons/Commentor";

interface BoardDetailProps {
    no: number;
    name: string;
    subject: string;
    content: string;
    dbday: string;
    hit: number;
}

interface BoardDeleteProps {
    msg: string;
}

export default function BoardDetail() {
    const {no} = useParams<string>();
    const type = useNavigationType();

    let [deleteBoolean,setDeleteBoolean] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);

    const {mutate: nodeBoardDelete} = useMutation({
        mutationFn: async () => {
            return await boardClient.post('/board/nodeDelete', {
                no: no,
                password: password
            })
        },

        onSuccess: (res: AxiosResponse<BoardDeleteProps>) => {
            if (res.data.msg === 'success') {
                window.location.href = '/board';
            } else {
                alert('비밀번호가 틀립니다');
                setPassword("");
                passwordRef.current?.focus();
            }
        },

        onError: (err: AxiosError) => {
            console.log(err);
        }
    });

    const boardDelete = async () => {
        if (!password.trim()) {
            passwordRef.current?.focus();
            return;
        }
        nodeBoardDelete();
    }

    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['board-detail', no],
        queryFn: async () => {
            return boardClient.get(`/board/nodeDetail?no=${no}`);
        }
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        console.log(error);
        return <h1>Error...</h1>;
    }

    if (!data) {
        return null;
    }

    const board = data.data

    return (
        <Fragment>
            <div className="detail-container">
                <h2 className="detail-title">{board.subject}</h2>

                <div className="detail-meta">
                    <span>번호 {board.no}</span>
                    <span>작성자 {board.name}</span>
                    <span>작성일 {board.regdate}</span>
                    <span>조회수 {board.hit}</span>
                </div>

                <div className="detail-content">
                    {board.content}
                </div>

                <div className="detail-actions">
                    <div className="detail-actions-row">
                        <Link to="/board" className="detail-btn detail-list-btn">목록</Link>
                        <Link to={`/board/edit/${board.no}`} className="detail-btn detail-edit-btn">수정</Link>
                        <button
                            className="detail-btn detail-delete-btn" onClick={() => boardDelete()}
                        >
                            삭제
                        </button>
                    </div>

                    <div className="detail-delete-input-container">
                        비밀번호 입력 :
                        <input
                            type="password"
                            className="detail-delete-input"
                            placeholder="비밀번호 입력"
                            ref={passwordRef}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <Commentor targetType={"board"} targetNo={board.no} />
        </Fragment>
    );}