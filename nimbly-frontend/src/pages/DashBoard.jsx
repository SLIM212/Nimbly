import { useNavigate, Link } from 'react-router-dom'
import './pages.css';
import '../index.css';

export default function DashBoard() {
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem('user-token');
        navigate('/login');
    }

    // fucntion to retrieve the to do list from the dummy api

    // then need to display it paginated

    // persistence is done by keeping the token in localstorage until logout is explicitly clicked

    // need to check if i have token 
    return (
        <div>
            todo list

            <button
                onClick={Logout}
                style={{ backgroundColor: '#e53170' }}
                className="hover:brightness-110 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
            >
                Logout
                
            </button>
        </div>
    );
}

