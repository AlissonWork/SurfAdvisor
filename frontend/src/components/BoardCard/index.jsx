import IconRuler from "../IconRuler";
import IconDroplet from "../IconDroplet";
import IconTrash from "../IconTrash";
import api from "../../services/api";

export default function BoardCard({ prancha, onDeleteSuccess }) {
  async function handleDelete(){
    const confirmacao = window.confirm(`Are you want to delete the board? "${prancha.nome}"?`);
    if (!confirmacao) return;
    try {
      await api.delete("/boards/" + prancha._id)
      onDeleteSuccess();
      
    } catch (erro) {
      console.error("Error deleting surfboard:", erro);
    }
  }

  return (
    <div className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300">
      {prancha.imagem && (
        <div className="relative overflow-hidden">
          <img
            src={`http://localhost:3000/${prancha.imagem}`}
            alt={prancha.nome}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {prancha.nome}
          </h2>
          <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/20">
            {prancha.estilo}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {prancha.descricao}
        </p>

        <div className="flex items-center gap-4 text-slate-500 text-sm pt-3 border-t border-slate-700/50">
          <span className="flex items-center gap-1.5">
            <IconRuler />
            {prancha.tamanho}
          </span>
          <span className="flex items-center gap-1.5">
            <IconDroplet />
            {prancha.litragem}L
          </span>
          <button 
            onClick={handleDelete}
            className="ml-auto flex items-center gap-1.5 text-slate-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-400/10"
            title="Apagar prancha"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
