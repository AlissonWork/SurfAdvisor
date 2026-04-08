export default function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/40 rounded-xl px-4 py-3">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
