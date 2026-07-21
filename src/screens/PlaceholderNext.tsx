/** Stands in for the Look Grid / Finding flow, which is its own upcoming task —
 *  keeps onboarding from dead-ending while that's built. */
export function PlaceholderNext() {
  return (
    <div
      style={{
        minHeight: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 24,
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 600 }}>Onboarding complete 🎉</h2>
      <p style={{ color: 'var(--color-muted)', maxWidth: 260, lineHeight: 1.5 }}>
        The look-matching flow (Finding your looks → grid → steps) is next up.
      </p>
    </div>
  );
}
