import {UserAuth} from '../context/AuthContext.tsx';

const Navbar = () => {
    const {currentUser, logout} = UserAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="navbar bg-primary text-primary-content">
            <div className=" containerWrap flex justify-between">
                <a className="btn btn-ghost text-xl">Chat</a>
                {currentUser ? <button onClick={handleLogout}>Logout</button> : "" }
            </div>
        </div>
    );
};
export default Navbar;
