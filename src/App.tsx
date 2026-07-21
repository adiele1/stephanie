// Temporary sanity-check screen — confirms fonts/palette/tokens are wired up correctly.
// Gets replaced by the real onboarding flow.
function App() {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        textAlign: 'center',
        background:
          'linear-gradient(180deg, oklch(93% 0.035 255) 0%, var(--color-page-bg) 60%)',
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>Glowith</h1>
      <p style={{ color: 'var(--color-muted)', maxWidth: 260, lineHeight: 1.5 }}>
        Design tokens loaded — Fredoka display type, Nunito Sans body, blue-led palette
        on a blush background.
      </p>
      <button className="btn-primary" style={{ width: 'auto', padding: '14px 28px' }}>
        Get Started
      </button>
    </div>
  );
}

export default App;
