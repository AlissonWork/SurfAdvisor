import IconRuler from "../IconRuler";
import IconUser from "../IconUser";
import IconCheck from "../IconCheck";
import IconWave from "../IconWave";

export default function BoardStyleCard({ style }) {
  return (
    <div className="group flex-shrink-0 w-[280px] sm:w-[320px] bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 snap-center">
      <div className="flex h-[320px] sm:h-[360px]">
        {/* Imagem */}
        <div className="relative w-[90px] sm:w-[100px] flex-shrink-0 overflow-hidden bg-slate-900">
          <img
            src={style.image}
            alt={style.name}

            className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
              {style.name}
            </h3>
            
            <div className="flex flex-col gap-1.5 mb-2">
              <span className="inline-flex w-fit items-center gap-1 text-[10px] sm:text-xs font-medium bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                <IconWave className="w-4 h-4 text-cyan-400" />
                {style.waveRange}
              </span>
              <span className="inline-flex w-fit items-center gap-1 text-[10px] sm:text-xs font-medium bg-purple-300/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
                <IconRuler />
                {style.averageSize}
              </span>
              <span className="inline-flex w-fit items-center gap-1 text-[10px] sm:text-xs font-medium bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full border border-slate-600/50">
                <IconUser />
                {style.level}
              </span>
            </div>
          </div>

          <ul className="space-y-1">
            {style.characteristics.map((char, index) => (
              <li key={index} className="flex items-start gap-1.5 text-xs sm:text-sm text-slate-400">
                <IconCheck />
                <span className="line-clamp-2">{char}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}