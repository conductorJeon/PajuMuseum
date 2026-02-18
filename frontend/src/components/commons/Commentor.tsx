import {Fragment, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Axios, AxiosResponse} from "axios";
import apiClient from "./apiClient";
import Paginator from "./Paginator";

interface CommentItem {
    id: number;
    writer: string;
    content: string;
    createdAt: string;
}

interface CommentsProps {
    currentPage: number;
    startPage: number;
    endPage: number;
    totalPages: number;
    totalCounts: number;
    list: CommentItem[];
}

interface CommentorResponseProps {
    targetType: string;
    targetNo: string;
}

interface CommentInsertProps {
    targetType: string;
    targetNo: string;
    writer: string;
    content: string;
}

export default function Commentor({targetType, targetNo}: CommentorResponseProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [writer, setWriter] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const writerRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const {data, error, isError, isLoading, refetch: commentsList} = useQuery<AxiosResponse<CommentsProps>>({
        queryKey: ['comments-list', targetNo, currentPage],
        queryFn: async () => await apiClient.get(
            `/comments/springList/${targetType}/${targetNo}/${currentPage}`)
    });

    const {mutate: commentInsert} = useMutation({
        mutationFn: async () => {
            console.log(content)
            const res:AxiosResponse<CommentInsertProps, Error> = await apiClient.post('/comments/springInsert', {
                targetType: targetType,
                targetNo: targetNo,
                writer: writer,
                content: content
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return res.data;
        },

        onSuccess: () => {
            commentsList()
        },

        onError: (err: Error) => {
            console.log(err);
        }
    })

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

    const comments = data.data.list;

    return (
        <Fragment>
            <div className="comment-container">
                <h2 className="comment-title">
                    댓글 <span>{data.data.totalCounts}</span>
                </h2>

                <div className="comment-form">
                    <input
                        type="text"
                        className="comment-writer"
                        placeholder="닉네임"
                        ref={writerRef}
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                    />
                    <textarea
                        className="comment-content"
                        placeholder="댓글을 입력하세요"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="comment-submit" onClick={() => commentInsert()}>
                        등록
                    </button>
                </div>

                <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <span className="comment-writer-name">{comment.writer}</span>
                                <span className="comment-date">{comment.createdAt}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <Paginator data={data.data} setCurrentPage={setCurrentPage} />
        </Fragment>
    );
}