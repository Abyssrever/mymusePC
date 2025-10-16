import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import MyMuse3D from './components/MyMuse3D';
import './App.css';


function App() {
    const [inputValue, setInputValue] = useState('');
    const [aiMessage, setAiMessage] = useState('你好！我是你的AI助手。');
    const [isRecording, setIsRecording] = useState(false);//语音状态

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        try {
            const response: string = await invoke("greet", { name: inputValue });
            setAiMessage(response);
        } catch (error) {
            console.error("调用 Rust command 'greet' 出错:", error);
            setAiMessage("调用后端时出错。");
        }
        setInputValue('');
    };

    const handleMicClick = () => { console.log('麦克风被点击'); };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSend();
    };

    return (
        <div className="app-wrapper">
            <div className="spline-background"><MyMuse3D /></div>
            <div className="chat-interface">
                <div className="subtitle-area">
                    <div className="chat-messages"><div className="ai-message">{aiMessage}</div></div>
                </div>
                <div className="chat-input">
                    <button className="mic-button" onClick={handleMicClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </button>
                    <input type="text" id="messageInput" placeholder="输入消息..." autoComplete="off" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
                    <button className="send-button" onClick={handleSend}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default App;