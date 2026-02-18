import {ChangeEvent, Fragment, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import boardClient from "../../components/commons/boardClient";
import {AxiosError, AxiosResponse} from "axios";

interface BoardDetailProps {
    no: number;
    name: string;
    subject: string;
    content: string;
}

interface BoardUpdateProps {
    msg: string;
}

export default function BoardUpdate() {
    const {no} = useParams();
    const nav = useNavigate();

    const [subject, setSubject] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    const subjectRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['board-update', no],
        queryFn: async () => {
            return boardClient.get<BoardDetailProps>(`/board/nodeUpdateDetail?no=${no}`)
        }
    });

    const board = data?.data

    useEffect(() => {
        if (board) {
            setSubject(board.subject);
            setName(board.name);
            setContent(board.content);
        }
    }, [board]);

    const {mutate: boardUpdate} = useMutation({
        mutationFn: () => boardClient.post('/board/nodeUpdate', {
            no: no,
            subject: subject,
            name: name,
            content: content,
            password: password
        }),

        onSuccess: (res: AxiosResponse<BoardUpdateProps>) => {
            console.log(res.data);
            if (res.data.msg === 'success') {
                window.location.href = `/board/detail/${no}`;
            } else {
                alert('비밀번호가 틀립니다.');
                setPassword("");
                passwordRef.current?.focus();
            }
        },

        onError: (err: AxiosError) => {
            console.log(err);
            alert('에러 발생')
        }
    })

    const boardUpdateBtn = () => {
        if (!subject.trim()) return subjectRef.current?.focus();
        else if (!name.trim()) return nameRef.current?.focus();
        else if (!content.trim()) return contentRef.current?.focus();
        else if (!password.trim()) return passwordRef.current?.focus();

        boardUpdate()
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        console.log(error);
        return <h1>Error...</h1>;
    }

    return (
        <Fragment>
            <div className="write-container">
                <h2 className="write-title">게시글 수정</h2>

                <form className="write-form">
                    <div className="write-row">
                        <label className="write-label">제목</label>
                        <input
                            type="text"
                            className="write-input"
                            placeholder="제목을 입력하세요"
                            maxLength={200}
                            ref={subjectRef}
                            value={subject}
                            onChange={(e: ChangeEvent<HTMLInputElement>):void =>
                                setSubject(e.target.value)}
                        />
                    </div>

                    <div className="write-row">
                        <label className="write-label">작성자</label>
                        <input
                            type="text"
                            className="write-input"
                            placeholder="이름을 입력하세요"
                            maxLength={50}
                            ref={nameRef}
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>):void =>
                                setName(e.target.value)}
                        />
                    </div>

                    <div className="write-row">
                        <label className="write-label">내용</label>
                        <textarea
                            className="write-textarea"
                            placeholder="내용을 입력하세요"
                            rows={10}
                            ref={contentRef}
                            value={content}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>):void =>
                                setContent(e.target.value)}
                        />
                    </div>

                    <div className="write-row">
                        <label className="write-label">비밀번호</label>
                        <input
                            type="password"
                            className="write-input"
                            placeholder="비밀번호 입력"
                            ref={passwordRef}
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>):void =>
                                setPassword(e.target.value)}
                        />
                    </div>

                    <div className="write-actions">
                        <button className="write-submit-btn" onClick={boardUpdateBtn}>
                            수정
                        </button>
                        <button
                            type="button"
                            className="write-cancel-btn"
                            onClick={() => nav(-1)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}