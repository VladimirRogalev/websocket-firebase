import {UserAuth} from '../context/AuthContext.tsx';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const {currentUser, signInWithGoogle} = UserAuth();
    console.log(currentUser);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (currentUser) {
            setTimeout(() => navigate('/chat'), 0);
        }
    }, [currentUser, navigate])

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Join the conversation!
                    </p>
                    <button onClick={handleLogin} className="btn btn-primary">Login with Google</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
