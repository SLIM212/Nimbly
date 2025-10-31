import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import './pages.css';
import '../index.css';

export default function DashBoard() {
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem('user-token');
        navigate('/login');
    }

    useEffect(() => {
        handleRetrieve();
    }, []);

    useEffect(() => {
        if (localStorage.getItem('user-token')) {
            navigate('/dashboard');
        }
    }, [navigate]);
    // fucntion to retrieve the to do list from the dummy api
    const handleRetrieve = async () => {
        try {
            const response = await fetch('https://dummyjson.com/comments')
            const data = await response.json();
            console.log(data.comments)
        } catch (error) {
            console.log("error?")
        }

    }
    // then need to display it paginated

    // persistence is done by keeping the token in localstorage until logout is explicitly clicked

    // need to check if i have token 
    return (
        <div>
            Todo list

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

