import { useState } from 'react';
import { core } from '@tauri-apps/api';
import MyMuse3D from './components/MyMuse3D';
import { invoke } from '@tauri-apps/api/core';
import { exit } from '@tauri-apps/plugin-process';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [aiMessage, setAiMessage] = useState('你好！我是你的AI助手。');
    const [isRecording, setIsRecording] = useState(false);//语音状态
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // 新增状态：控制设置面板显示/隐藏

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

    // 设置按钮点击处理函数
    const handleSettingsClick = () => {
        setIsSettingsOpen(!isSettingsOpen);
        console.log('设置按钮被点击，当前状态:', !isSettingsOpen);
    };
    // 退出程序函数
    const handleExit = async () => {
        console.log('尝试退出程序...');
        try {
            await exit(); // 调用 Tauri API 退出应用
        } catch (error) {
            // 生产环境中可能不需要这个，但开发时可以保留用于调试
            console.error("退出程序时出错:", error); 
        }
    };

    return (
        <div className="app-wrapper">
            <div className="spline-background"><MyMuse3D /></div>
            
            {/* 设置面板占位符 (使用条件渲染) */}
            {isSettingsOpen && (
                <div className="settings-panel">
                    <button className="close-button" onClick={handleSettingsClick}>×</button>
                    {/* 这里的UI将在下一步用CSS美化 */}
                    <div className="settings-content">
                        <h2>常规设置</h2>
                        <p>主题、语言、声音等配置将在此处实现（参考需求文档）</p>
                    </div>
                    {/* 底部退出程序部分 */}
                    <div className="settings-footer">
                        <button className="exit-button" onClick={handleExit}>
                            退出程序
                        </button>
                    </div>
                </div>
            )}
            
            {/* 左下角的设置按钮 */}
            <button className="settings-button" onClick={handleSettingsClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V23a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V1a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H23a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </button>

            {/* 聊天界面 */}
            <div className="chat-interface">
                {/* ... (聊天界面内容) */}
                <div className="subtitle-area">
                    <div className="chat-messages"><div className="ai-message">{aiMessage}</div></div>
                </div>
                <div className="chat-input">
                    {/* ... (Mic Button, Input, Send Button ) */}
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