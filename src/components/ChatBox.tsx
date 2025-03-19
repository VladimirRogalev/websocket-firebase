import Message from './Message.tsx';
import {collection, limit, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useEffect, useRef, useState} from 'react';
import {db} from '../../firebase.tsx';

interface MessageType {
    id: string;
    uid: string;
    text: string;
    name: string;
    avatar: string;
    createdAt?: number;
}

const ChatBox = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [messages, setMessages] = useState<MessageType[]>([]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt'),
            limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesArray: MessageType[] = [];
            querySnapshot.forEach((doc) => {
                const messageData = doc.data() as MessageType;
                messagesArray.push({ ...messageData, id: doc.id });
            });
            setMessages(messagesArray);
        });
        return () => unsubscribe();
    }, []);

    return (<div className="pb-44 pt-20 containerWrap">
        {messages.map(msg => (<Message key={msg.uid} message={msg}/>))}
        <div ref={messagesEndRef}></div>
    </div>);
};
export default ChatBox;
