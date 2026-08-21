import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slice/user.thunk.js";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { fullName, username, password, gender };
    const result = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(result)) {
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      alert(result.payload?.message || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="text-gray-300 block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-300 block mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-300 block mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-gray-300 block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-sky-500 hover:text-sky-400 font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
