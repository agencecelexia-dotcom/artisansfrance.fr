/** Marque : un faîtage d'ardoise (deux rangées de tuiles décalées) et le nom du site. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" fill="currentColor" />
      <path d="M5 17 16 7l11 10" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 24a3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0 7 0" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <LogoMark className={`size-8 ${onDark ? "text-sable-100 [&_path]:stroke-ardoise-800" : "text-ardoise-700"}`} />
      <span className={`font-display text-xl font-extrabold tracking-tight ${onDark ? "text-white" : "text-ardoise-800"}`}>Artisans France</span>
    </span>
  );
}
