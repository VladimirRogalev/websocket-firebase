import {useState} from 'react';
import {UserAuth} from '../context/AuthContext.tsx';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebase.tsx';

const SendMessage = () => {
    const [value, setValue] = useState('');
    const {currentUser} = UserAuth();

    const handleSendMessage = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() === '') {
            alert('Enter valid message');
            return;
        }
        if (!currentUser) return null;
        try {
            const {uid, displayName, photoURL} = currentUser;

            await addDoc(collection(db, 'messages'), {
                text: value,
                name: displayName,
                avatar: photoURL || null,
                createdAt: serverTimestamp(),
                uid
            });
        } catch (err) {
            console.log(err);
        }
        console.log(value);
        setValue('');
    };

    return (
        <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
            <form onSubmit={handleSendMessage} className=" px-2 containerWrap flex">
                <input value={value} onChange={event => setValue(event.target.value)}
                       className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text"/>
                <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg  px-5 text-sm">Send</button>
            </form>
        </div>
    );
};
export default SendMessage;
