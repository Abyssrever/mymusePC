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
    const [activeSetting, setActiveSetting] = useState('常规'); // 当前激活的设置项
    const [isMemoryManagerOpen, setIsMemoryManagerOpen] = useState(false); // 新增：记忆管理面板状态

    // 新增：模拟记忆数据，用于渲染列表
    const memoryItems = [
        "用户希望做 ToC 方向的、有创意、可以快速试水的 AI 项目。.",
        "用户对'文化宣传'方向的创意项目感兴趣。.",
        "用户的服务器是 Windows 11，想通过内网穿透在家中的私有云部署 Docker。.",
        "用户的私有云设备是绿联 DH2100+，使用 Ngrok 进行内网穿透。.",
        "用户希望逐步丰富自己的提示词库，以提高效率。",
        "用户的产品名叫 AIO，是集合 OKR 和扁平化管理的思想做的 AI 公司管理软件，理念是希望 AI 帮助员工工作。",
        "用户喜欢\"轻松管理，一切交给 AI。\" \"Effortless management, powered by AI。\" 这句话。",
        "用户希望做 ToC 方向的、有创意、可以快速试水的 AI 项目。.",
        "用户对'文化宣传'方向的创意项目感兴趣。.",
        "用户的服务器是 Windows 11，想通过内网穿透在家中的私有云部署 Docker。.",
        "用户的私有云设备是绿联 DH2100+，使用 Ngrok 进行内网穿透。.",
        "用户希望逐步丰富自己的提示词库，以提高效率。",
        "用户的产品名叫 AIO，是集合 OKR 和扁平化管理的思想做的 AI 公司管理软件，理念是希望 AI 帮助员工工作。",
        "用户喜欢\"轻松管理，一切交给 AI。\" \"Effortless management, powered by AI。\" 这句话。",

    ];

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

    const settingItems = [
        { name: '常规', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18A2 2 0 0 1 9.68 6L7.5 7.63a2 2 0 0 0-1 1.76v2.24a2 2 0 0 0 1 1.76L9.68 18.06A2 2 0 0 1 10.18 20v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 .5-1.76l2.18-1.63a2 2 0 0 0 1-1.76v-2.24a2 2 0 0 0-1-1.76L14.32 6a2 2 0 0 1-.5-1.76V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        ) },
        { name: '通知', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
        ) },
        { name: '个性化', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.85 0 0 1 4 4L13.5 17.5 8 22l4.5-4.5L21 7"></path>
                <path d="m13.5 6.5 4 4"></path>
            </svg>
        ) },
        { name: '应用与连接器', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                <rect x="14" y="12" width="7" height="9" rx="1"></rect>
            </svg>
        ) },
        { name: '订单', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        ) },
        { name: '数据管理', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        ) },
        
        { name: '账户', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        ) },
        
    ];

    const SettingContent = () => {
        switch (activeSetting) {
            case '常规':
                return (
                    <div className="setting-section">
                        <h3>常规</h3>
                        <div className="setting-item">
                            <label>LLM模型</label>
                            <div className="setting-control">本地 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <div className="setting-item">
                            <label>语言</label>
                            <div className="setting-control">自动检测 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <div className="setting-item">
                            <label>口语</label>
                            <div className="setting-control">自动检测 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <p className="setting-description">为获得最佳结果，请选择您使用的主要语言。即使未列出的语言也可通过自动检测功能进行识别。</p>
                        <div className="setting-item">
                            <label>声音</label>
                            <div className="setting-control">声音模型1 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                    </div>
                );
            case '通知':
                return (
                    <div className="setting-section">
                        <h3>通知</h3>
                        <div className="setting-item">
                            <label>回复</label>
                            <div className="setting-control">推送 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <p className="setting-description">在 Muse 回复需要一定时间的请求（如研究或图像生成）时获得通知。</p>
                        <div className="setting-item">
                            <label>任务</label>
                            <div className="setting-control">推送, 电子邮件 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <p className="setting-description">当您创建的任务有更新时收到通知。管理任务</p>
                        <div className="setting-item">
                            <label>推荐</label>
                            <div className="setting-control">推送, 电子邮件 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <p className="setting-description">及时了解 Muse 的新工具、技巧以及功能。</p>
                    </div>
                );
            case '个性化':
                return (
                    <div className="setting-section">
                        <h3>个性化</h3>
                        <div className="setting-item">
                            <label>启用自定义</label>
                            <div className="setting-control">
                                <label className="switch">
                                    <input type="checkbox" defaultChecked disabled />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <p className="setting-description">自定义 Muse 的回复方式。了解更多</p>
                        <div className="setting-item">
                            <label>Muse 个性</label>
                            <div className="setting-control">技术宅 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <p className="setting-label">自定义指令</p>
                        <textarea className="setting-textarea" defaultValue="健谈、善于交谈。使用鼓励的语气。采取前瞻性的观点。"></textarea>
                        <div className="setting-tags">
                            <button className="tag-button">健谈</button>
                            <button className="tag-button">诙谐</button>
                            <button className="tag-button">直言不讳</button>
                            <button className="tag-button">鼓励性</button>
                            <button className="tag-button">Z世代</button>
                            <button className="tag-button">...</button>
                        </div>

                        <p className="setting-label">关于您</p>
                        <div className="setting-item">
                            <label>昵称</label>
                            <input type="text" placeholder="Muse 应该怎么称呼您?" className="setting-input" />
                        </div>
                        <div className="setting-item">
                            <label>职业</label>
                            <input type="text" defaultValue="软件开发工程师" className="setting-input" />
                        </div>
                        <p className="setting-label">您的详情</p>
                        <textarea className="setting-textarea" defaultValue="耐心指导我学习，促进我进步"></textarea>
                        
                        <div className="setting-item mt-20">
                            <label>记忆</label>
                            <div className="setting-control">
                                <button className="setting-button-action" onClick={() => setIsMemoryManagerOpen(true)}>管理</button>
                            </div>
                        </div>
                        
                        {/* 重点：这里只保留“参考保存的记忆”和“参考历史聊天记录”开关 */}
                        <div className="setting-item">
                            <label>参考保存的记忆</label>
                            <div className="setting-control">
                                <label className="switch">
                                    <input type="checkbox" defaultChecked disabled />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <p className="setting-description">让 Muse 保存记忆并在回复时使用记忆。</p>
                        <div className="setting-item">
                            <label>参考历史聊天记录</label>
                            <div className="setting-control">
                                <label className="switch">
                                    <input type="checkbox" defaultChecked disabled />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <p className="setting-description">让 Muse 在回复时参考最近的对话。</p>
                        <p className="setting-description">GPT 可使用记忆库，通过必应搜索提供商进行个性化查询。了解更多</p>
                        
                 
                    </div>
                );
            case '应用与连接器':
                return (
                    <div className="setting-section">
                        <h3>应用</h3>
                        <p className="setting-description">关联应用，以便在 Muse 中以直观、互动的方式与之交流。了解更多。</p>
                        <div className="app-grid">
                            <div className="app-card"><span className="app-icon">B.</span>Booking.com</div>
                            <div className="app-card"><span className="app-icon">C.</span>Canva</div>
                            <div className="app-card"><span className="app-icon">C.</span>Coursera</div>
                            <div className="app-card"><span className="app-icon yellow">E.</span>Expedia</div>
                            <div className="app-card"><span className="app-icon pink">F.</span>Figma</div>
                            <div className="app-card"><span className="app-icon blue">Z.</span>Zillow</div>
                        </div>
                    </div>
                );
            case '订单':
                return (
                    <div className="setting-section">
                        <h3>订单</h3>
                        <p>订单管理内容区域。</p>
                    </div>
                );
            case '数据管理':
                return (
                    <div className="setting-section">
                        <h3>数据管理</h3>
                        <div className="setting-item">
                            <label>为所有用户改进模型</label>
                            <div className="setting-control">
                                开
                                <label className="switch" style={{ marginLeft: '10px' }}>
                                    <input type="checkbox" defaultChecked disabled />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>共享链接</label>
                            <div className="setting-control">
                                <button className="setting-button-action">管理</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>已归档的聊天</label>
                            <div className="setting-control">
                                <button className="setting-button-action">管理</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>归档所有聊天</label>
                            <div className="setting-control">
                                <button className="setting-button-action primary">全部归档</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>删除所有聊天</label>
                            <div className="setting-control">
                                <button className="setting-button-action danger">全部删除</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>导出数据</label>
                            <div className="setting-control">
                                <button className="setting-button-action">导出</button>
                            </div>
                        </div>
                    </div>
                );
            case '账户':
                return (
                    <div className="setting-section">
                        <h3>账户</h3>
                        <div className="setting-item">
                            <label>获取 MyMuse Plus</label>
                            <div className="setting-control">
                                <button className="setting-button-action primary">升级</button>
                            </div>
                        </div>
                        <p className="setting-description">享受免费套餐中的所有功能，以及更多福利。</p>
                        
                        <ul className="upgrade-list">
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 4-8"/></svg>支持高级推理功能的 GPT-5</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>扩展的消息和上传限额</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>扩展且较快的图片生成</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>扩展的记忆和背景信息</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 0 0 3 14"></path><path d="M12 10a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"></path><path d="M8 10a2 2 0 0 0-2 2v2"></path><path d="M8 17h4"></path><path d="M18 17h-2"></path><path d="M21 14h-1.26A8 8 0 0 0 15 10"></path></svg>扩展的深入研究和代理模式</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>项目、任务、自定义 GPT</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>Sora 视频生成</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>Codex 代理</li>
                        </ul>
                        
                        <div className="setting-item mt-20">
                            <label>删除账户</label>
                            <div className="setting-control">
                                <button className="setting-button-action danger">删除</button>
                            </div>
                        </div>
                        <p className="setting-label"> 构建者个人资料</p>
                        <p className="setting-description">个性化您的 构建者个人资料，以便与您的 的用户建立联系。这些设置将应用于公开共享的。</p>
                        <div className="gpt-profile-placeholder">
                            <div className="gpt-icon-box">
                                <div className="gpt-icon"> 占位符</div>
                                <p className="gpt-creator">创建者：Abyssrever <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3 4.66 4.66 0 0 0 18 2.5a6 6 0 0 0-4 1.4c-.95-2-3.5-2-4.5-2A6 6 0 0 0 6 2.5a4.66 4.66 0 0 0-1.91.77A5.44 5.44 0 0 0 2 6.84c0 5.43 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.61V22"></path></svg></p>
                            </div>
                            <p className="preview-label">预览</p>
                        </div>
                        
                        <p className="setting-label">链接</p>
                        <div className="setting-item">
                            <label>世界图标</label>
                            <div className="setting-control">选择一个域 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                        </div>
                        <div className="setting-item">
                            <label>LinkedIn</label>
                            <div className="setting-control">
                                <button className="setting-button-action">添加</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label>GitHub</label>
                            <div className="setting-control">
                                <span>Abyssrever</span>
                                <button className="setting-button-action danger-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                            </div>
                        </div>

                        <p className="setting-label">电子邮件</p>
                        <div className="setting-item">
                            <label>anlan01819@gmail.com</label>
                            <div className="setting-control">
                                <label className="checkbox-container">
                                    <input type="checkbox" disabled />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <p className="setting-description">接收反馈电子邮件</p>
                    </div>
                );
            
        }
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
            {isSettingsOpen && (
                <div className="settings-panel-overlay">
                    <div className="settings-panel">
                        <div className="settings-header">
                            <button className="close-button" onClick={() => setIsSettingsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="settings-layout">
                            <div className="settings-sidebar">
                                {settingItems.map((item) => (
                                    <button 
                                        key={item.name} 
                                        className={`settings-sidebar-item ${activeSetting === item.name ? 'active' : ''}`} 
                                        onClick={() => setActiveSetting(item.name)}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </button>

                                ))}
                                {/* 【新增】退出程序按钮，放在左侧导航底部 */}
                                <button className="exit-program-button danger" onClick={handleExit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span>退出程序</span>
                                </button>
                            </div>
                            <div className="settings-content-wrapper">
                                <div className="settings-content">
                                    <SettingContent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* 记忆管理面板 JSX，当 isMemoryManagerOpen 为 true 时显示 */}
            {isMemoryManagerOpen && (
                <div className="settings-panel-overlay">
                    <div className="memory-manager-panel">
                        <div className="settings-header">
                            <button className="close-button" onClick={() => setIsMemoryManagerOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <span className="memory-manager-title">保存的记忆</span>
                        </div>

                            <div className="memory-content-wrapper">
                            <div className="memory-list">
                                {/* ... memoryItems.map 保持不变 ... */}
                                {memoryItems.map((memory, index) => (
                                    <div key={index} className="memory-item">
                                        <p className="memory-text">{memory}</p>
                                        <button className="delete-memory-button" title="删除">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            {/* 【修正后的结构】底部栏只包含右侧的“全部删除”按钮 */}
                            <div className="memory-footer">
                                <button className="setting-button-action danger">全部删除</button>
                            </div>
                        </div>
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