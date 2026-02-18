import {ChangeEvent, Fragment, useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import boardClient from "../../components/commons/boardClient";
import {useNavigate} from "react-router";


export default function BoardInsert() {
    const nav = useNavigate();

    const [subject, setSubject] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    const subjectRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {mutate: boardInsert} = useMutation({
        mutationFn: async () => {
            return await boardClient.post('/board/nodeInsert', {
                subject: subject,
                name: name,
                content: content,
                password: password
            })
        },

        onSuccess: (res) => {
            if (res.data.msg === 'success') {
                window.location.href = '/board';
            } else {
                alert('게시판 등록에 실패하셨습니다.')
            }
        },

        onError: (err:Error) => {
            alert('게시판 등록에 실패하셨습니다.')
            console.log(err.message);
        }
    })

    return (
        <Fragment>
            <div className="write-container">
                <h2 className="write-title">게시글 작성</h2>

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
                        <button className="write-submit-btn" onClick={() => boardInsert()}>
                            등록
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