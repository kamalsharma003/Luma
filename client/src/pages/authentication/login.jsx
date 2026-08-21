import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserThunk } from "../../store/slice/user.thunk";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      username,
      password,
    };

    const result = await dispatch(loginUserThunk(loginData));

    if (loginUserThunk.fulfilled.match(result)) {
      navigate("/home");
    } else {
      toast.error(result.payload?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-300 block mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold transition"
        >
          Login
        </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
