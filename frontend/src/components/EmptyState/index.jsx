import IconSurfboard from "../IconSurfboard";

export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600">
        <IconSurfboard />
      </div>
      <h3 className="text-xl font-semibold text-slate-300 mb-2">Your quiver is empty</h3>
      <p className="text-slate-500 text-sm mb-6">Add your first board to start managing your equipment.</p>
    </div>
  );
}
