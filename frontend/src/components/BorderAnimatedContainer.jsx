// Glassomorphism container with animated border
function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden">
      {/* Animated border gradient */}
      <div className="absolute inset-0 [background:linear-gradient(45deg,transparent,transparent)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.white/.2)_80%,_theme(colors.white/.8)_86%,_theme(colors.white)_90%,_theme(colors.white/.8)_94%,_theme(colors.white/.2))_border-box] rounded-3xl border-2 border-transparent animate-border"></div>

      {/* Glass content container */}
      <div className="relative w-full h-full bg-black/40 backdrop-blur-2xl rounded-3xl flex overflow-hidden shadow-2xl shadow-black/50">
        {children}
      </div>
    </div>
  );
}
export default BorderAnimatedContainer;
