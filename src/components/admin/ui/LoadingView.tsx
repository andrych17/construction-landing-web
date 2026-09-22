export function LoadingView({ message = 'Memuat...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-5 animate-in fade-in duration-150">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full bg-amber-400/20 blur-lg animate-pulse" />
        <div className="absolute h-12 w-12 rounded-full border-4 border-amber-100" />
        <div className="absolute h-12 w-12 rounded-full border-4 border-t-amber-500 border-r-amber-500/30 border-b-transparent border-l-transparent animate-spin [animation-duration:0.9s]" />
        <div className="absolute h-7 w-7 rounded-full border-[3px] border-b-slate-800 border-l-slate-800/30 border-t-transparent border-r-transparent [animation-direction:reverse] animate-spin [animation-duration:0.6s]" />
      </div>
      <p className="text-xs font-bold text-slate-400 tracking-wider uppercase animate-pulse">{message}</p>
    </div>
  );
}
