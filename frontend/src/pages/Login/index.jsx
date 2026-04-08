import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password 
      });

      const token = response.data.token;
      localStorage.setItem("surfadvisor_token", token);
      
      api.defaults.headers.Authorization = `Bearer ${token}`;

      alert("Login successful! 🌊");
      
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Incorrect email or password.";
      alert(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center p-6">
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to <br/><span className="text-cyan-400">SurfAdvisor</span>
          </h1>
          <p className="text-slate-400">Sign in to manage your quiver.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
        
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg shadow-cyan-500/30 mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Sign-up 
          </Link>
        </p>

      </div>
    </div>
  );
}