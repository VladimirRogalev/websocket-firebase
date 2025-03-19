import Navbar from './components/Navbar.tsx';
import Login from './pages/Login.tsx';
import ChatRoom from './pages/ChatRoom.tsx';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.tsx';
import {AuthProvider} from './context/AuthContext.tsx';

function App() {

    return (
        <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/chat" element={<PrivateRoute><ChatRoom/></PrivateRoute>}/>
                </Routes>
        </AuthProvider>

    );
}

export default App;
