import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import './pages.css';
import '../index.css';

export default function DashBoard() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;

    const Logout = () => {
        localStorage.removeItem('user-token');
        navigate('/login');
    }

    useEffect(() => {
        if (!localStorage.getItem('user-token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        handleRetrieve();
    }, []);

    const handleRetrieve = async () => {
        try {
            const response = await fetch('https://dummyjson.com/todos');
            const data = await response.json();
            setTodos(data.todos);
            console.log(data.todos)
        } catch (error) {
            console.log("Error fetching todos", error);
        }
    }

    // to calculate the todos to display on current page
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // slicing the total list of todos
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    // to show at the bottom when switching between pages
    const totalPages = Math.ceil(todos.length / todosPerPage);

return (
    <div>
        {/* navbar */}
        <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
            <h1 className="text-xl font-semibold">To-Do List</h1>
            <button
                onClick={Logout}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded"
            >
                Logout
            </button>
        </nav>
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* todo list */}
            <div className="max-w-2xl mx-auto mt-6 space-y-2 flex-1">
            {/*mapping all the todos on the current page into divs usign flex box*/}
                {currentTodos.map(todo => (
                    <div
                        key={todo.id}
                        className="border-b border-gray-300 py-4 px-20 flex justify-between items-center text-base bg-white rounded-md shadow-md"
                        style={{ minHeight: '80px' }} // ensures each bar is taller
                    >
                        <p className="flex-1">
                            {todo.todo}
                        </p>
                        <p className={todo.completed ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                            {todo.completed ? "Completed" : "Not Completed"}
                        </p>
                    </div>
                ))}
            </div>

            {/* pagination controls move prev up and down by one for when pagination happens*/}
            <div className="flex justify-center items-center space-x-4 mt-4 pb-8 bg-gray-100">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="font-medium">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
);

}
