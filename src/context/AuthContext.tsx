import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser} from 'firebase/auth';
import {auth} from '../../firebase.tsx';

interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string | null;
}

interface AuthContextType {
    currentUser: User | null;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthContextProps {
    children: ReactNode;
}

//create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// provider context
export const AuthProvider = ({children}: AuthContextProps) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // const [loading, setLoading] = useState(true);
// signin with google
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider); // ✅ Попап вместо редиректа
        } catch (error) {
            console.error('Ошибка входа через Google:', error);
        }
    };

    // signout

    const logout = () => signOut(auth);

    const value = {
        currentUser,
        setCurrentUser,
        signInWithGoogle,
        logout
    };

    //set currentUser

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'No Name',
                });
                // setLoading(false)
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);
    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    );
};

export const UserAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth need to use insight AuthProvider');
    }
    return context;
};