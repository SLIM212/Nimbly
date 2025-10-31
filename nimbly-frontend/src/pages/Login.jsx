import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorPopup, setError] = useState('')
  const [popupVisible, setPopupVisible] = useState(false);

  // to prevent users from navigating to login page if they are already logged in via the search bar
  useEffect(() => {
      if (localStorage.getItem('user-token')) {
          navigate('/dashboard');
      }
  }, [navigate]);

    
  // to show popup if error occurs
  // trigger the popup visibility when either errorPopup or messagePopup changes
    // useEffect(() => {
    //     if (errorPopup) {
    //         setPopupVisible(true); 
    //     }
    // }, [errorPopup]);

  // will need popups for error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username)
    // console.log(password)
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
        // credentials: "include", // include cookies if any
      });

      const data = await response.json();
      // checking status code
      if (!response.ok) {
        console.log(data)
          // backend api seems to return message object within and object
          throw new Error(data.message);
      }

      // save access token in localStorage
      localStorage.setItem("user-token", data.accessToken);
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      // need to show popup if there is an error
      if (error instanceof Error) {
        setError(error.message);
        setUsername('');
        setPassword('');
      } else {
        setUsername('');
        setPassword('');
        // if for some reason something goes catastrophically wrong at least there'll be an error message
        setError("Unknown error occurred");
      }
    }
  };

  return (
    // <div>Hello</div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              username
            </label>
            <input
              type="username"
              id="username"
              required
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Sign in
          </button>
          {/* Error popup placement here */}
          {errorPopup && (
            <div className="text-red-600 text-sm mb-2">
              {errorPopup}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
