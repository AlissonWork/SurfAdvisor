import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [peso, setPeso] = useState("");
  const [nivel, setNivel] = useState("beginner");

  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();

    const dadosParaEnviar = {
      nome,
      email,
      password: senha,
      peso: Number(peso),
      nivel,
    };

    try {
      await api.post("/users/register", dadosParaEnviar);
      alert("Registration successful!🏄‍♂️");
      navigate("/login");
    } catch (erro) {
      console.error("Error during registration:", erro);
      const mensagemErro =
        erro.response?.data?.message || "Error creating account. Please try again.";
      alert(mensagemErro);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center p-6">
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Create <span className="text-cyan-400">Account</span>
          </h1>
          <p className="text-slate-400">
            Join SurfAdvisor to manage your quiver.
          </p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="Gabriel Medina"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                min="30"
                max="150"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="75"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Surf Level
              </label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediary</option>
                <option value="advanced">Advanced</option>
                <option value="pro">Professional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg shadow-cyan-500/30 mt-4"
          >
            Cadastrar
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <p className="mt-6 text-center text-slate-400 text-sm">
          Do you already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Log-in
          </Link>
        </p>
      </div>
    </div>
  );
}
