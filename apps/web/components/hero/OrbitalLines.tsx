export function OrbitalLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-[520px] w-[520px] max-w-full">
        <div className="absolute inset-0 animate-orbit-spin rounded-full border border-copper/25" />
        <div
          className="absolute inset-[12%] rounded-full border border-copper/20"
          style={{ animation: 'orbit-spin 80s linear infinite reverse' }}
        />
        <div className="absolute inset-[26%] rounded-full border border-camel/25" />
      </div>
    </div>
  );
}
