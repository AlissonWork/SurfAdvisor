import {createPortal} from 'react-dom';
import IconRuler from '../IconRuler';
import IconDroplet from '../IconDroplet';
import IconWave from '../IconWave';
import IconBoard from '../IconBoard';
import IconClose from '../IconClose';

export default function BoardDetailsModal({isOpen, onClose, prancha}) {
    if(!isOpen || !prancha) return null;

    return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md transition-opacity"
      onClick={onClose} // Clicar no fundo escuro fecha o modal
    >
      {/* Container principal (stopPropagation evita que clicar dentro feche o modal) */}
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 backdrop-blur-sm rounded-full transition-all"
        >
          <IconClose />
        </button>

        {/* Lado Esquerdo: Imagem */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-800/50 relative">
          {prancha.imagem ? (
            <img 
              src={`http://localhost:3000/${prancha.imagem}`} 
              alt={prancha.nome} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
              <IconBoard className="w-16 h-16 mb-2 opacity-50" />
              <p>No image</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Lado Direito: Informações */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                {prancha.estilo}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{prancha.nome}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-cyan-400 mb-1"><IconRuler /></div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Size</p>
              <p className="text-xl font-bold text-white">{prancha.tamanho}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-cyan-400 mb-1"><IconDroplet /></div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Volume</p>
              <p className="text-xl font-bold text-white">{prancha.litragem} L</p>
            </div>
            <div className="col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-cyan-400 mb-1"><IconWave /></div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Ideal Waves</p>
              <p className="text-xl font-bold text-white">
                {prancha.ondaMinima}m <span className="text-slate-500 mx-1">to</span> {prancha.ondaMaxima}m
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-300 mb-2 border-b border-slate-700/50 pb-2">About this Board</h3>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
              {prancha.descricao || "No description provided for this board."}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}