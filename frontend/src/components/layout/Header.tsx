import {Fragment, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import apiClient from "../commons/apiClient";

export default function Header() {
    const [login, setLogin] = useState<boolean>(false);

 /*   const [id, setId] = useState<string>();
    const [password, setPassword] = useState<string>();

    const idRef = useState<HTMLInputElement>(null);
    const passwordRef = useState<HTMLInputElement>(null);

    interface LoginData {
        id: string;
        name: string;
        msg: string;
    }

    const {mutate: loginCheck} = useMutation({
        mutationFn: async (data) => {
            const res:AxiosResponse<LoginData> = await apiClient.get(`/member/login/${id}/${password}`);
            return res.data;
        },

        onSuccess: (data:LoginData) => {
            if (data.msg === 'NOID') {
                alert('아이디가 존재하지 않습니다.');
                setId('');
                setPassword('');
                idRef.current?.focus();
            } else if (data.msg === 'NOPASSWORD') {
                alert('비밀번호가 틀립니다.');
                setPassword('');
                passwordRef.current?.focus();
            } else if (data.msg === 'OK') {
                window.sessionStorage.setItem('id', data.id);
                window.sessionStorage.setItem('name', data.name);
                setLogin(true);
                window.location.reload();
            }
        },

        onError: (err:AxiosError) => {
            console.log('Login Error : ', err.message);
        }
    })

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            setLogin(true);
        }
    })

    const memberLogin = () => {
        if (id?.trim() === '') {
            idRef.current?.focus();
        }

        if (password?.trim() === '') {
            passwordRef.current?.focus();
        }

        loginCheck();
    }

    const memberLogout = () => {
        window.sessionStorage.clear();
        setId('');
        setPassword('');
        setLogin(false);
        window.location.reload();
    }*/

    return (
        <Fragment>
            <header className="header-container">
                <div className="header-inner">
                    <h1 className="header-logo">Paju-Museum</h1>

                    <nav className="header-nav">
                        <a href="/">Home</a>
                        <a href="/collections">컬렉션</a>
                        <a href="/chatbot">챗봇</a>
                        <a href="/board">게시판</a>
                    </nav>

                    <div className="header-actions">
                        <button className="header-login-btn">Login</button>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}