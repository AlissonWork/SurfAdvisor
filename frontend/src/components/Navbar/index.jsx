import { useNavigate, Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png"; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("surfadvisor_token");
    navigate("/login");
  }

  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-3 flex justify-between items-center shadow-xl shadow-black/20 sticky top-0 z-50">
      
      {/* 1. Area do Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <div className="p-1.5 pt-0 rounded-xl transition-all duration-300 group-hover:bg-slate-800 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
          <img 
            src={logoImg} 
            alt="SurfAdvisor Logo" 
            className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. Menu de Navegacao Central */}
      <div className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50">
        <Link 
          to="/home" 
          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            location.pathname === "/home" 
              ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/30" 
              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          My Quiver
        </Link>
        <Link 
          to="/advisor" 
          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            location.pathname === "/advisor" 
              ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/30" 
              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          Beach Advisor
        </Link>
      </div>

      <button 
        onClick={handleLogout}
        className="text-slate-400 hover:text-white font-medium transition-all duration-300 border border-slate-600/50 hover:border-cyan-500/50 hover:bg-slate-800 px-5 py-2 rounded-full text-sm"
      >
        Sign Out
      </button>
    </nav>
  );
}