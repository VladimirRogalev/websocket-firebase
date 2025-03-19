import {UserAuth} from '../context/AuthContext.tsx';

interface MessageProps {
    message: { uid: string;
        text: string;
        name: string;
        avatar: string;
        createdAt?: number; },
}

const Message = ({message}: MessageProps) => {
    const {currentUser} = UserAuth();
    if (!currentUser) return null;
    return (
        <div>
            <div className={`chat ${message.uid === currentUser.uid ? "chat-end": "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={message.avatar}/>
                    </div>
                </div>
                <div className="chat-header">
                    {message.name}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>

            </div>
        </div>
    );
};
export default Message;
