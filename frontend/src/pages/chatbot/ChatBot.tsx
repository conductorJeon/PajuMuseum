import {useEffect, useState} from "react";
import apiClient from "../../components/commons/apiClient";

export default function ChatBot() {
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string}[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [inputBoolean, setInputBoolean] = useState(true);

    useEffect(() => {
        const chatWindow = document.querySelector('.chat-messages')

        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!inputMessage.trim() || !inputBoolean) return;

        setMessages(prev => [...prev, { sender: "user", text: inputMessage}]);
        responseMessage(inputMessage + " 마크 다운 사용하지 말고 알려줘")

        setInputMessage("");
        setInputBoolean(false);
    };

    const responseMessage = async (inputMessage: string) => {
        setMessages(prev => [...prev, { sender: "bot", text: "..." }]);
        const res = await apiClient.get(`/chatbot/${inputMessage}`);

        let cleanRes = res.data.replace(/^data:/gm, '').trim();
        cleanRes = cleanRes.replace(/[\n\r]/g, '');

        const charArray = [...cleanRes];
        let printMessage = "";

        setMessages(prev => [...prev.slice(0, -1), { sender: "bot", text: "" }]);
        for (let i = 0; i < charArray.length; i++) {
            if (charArray[i] === '.') {
                if (Number(charArray[i - 1])) {
                    charArray[i] = ' .';
                } else {
                    charArray[i] = '.\n';
                }
            } else if (charArray[i] === '!') {
                charArray[i] = '!\n';
            } else if (charArray[i] === '?') {
                charArray[i] = '?\n';
            } else if (charArray[i] === '*') {
                if (charArray[i + 1] === ' ') {
                    charArray[i] = '- ';
                } else if (charArray[i + 1] === '*') {
                    charArray[i] = '';
                    charArray[i + 1] = '';
                }
            } else if (charArray[i] === ':') {
                charArray[i] = ':\n';
            }

            printMessage += charArray[i];

            setMessages(prev => [
                ...prev.slice(0, -1),
                { ...prev[prev.length - 1], text: printMessage }
            ]);
            await wait(20);
        }
        setInputBoolean(true);
    }

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Spring AI 챗봇</h2>
            </div>

            <div className="chat-messages">
                <div className="message bot">안녕하세요 궁금한 점을 물어보세요.</div>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage}
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}