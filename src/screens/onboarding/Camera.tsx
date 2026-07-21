import { useNavigate } from 'react-router-dom';
import { Camera as CapacitorCamera } from '@capacitor/camera';
import { CameraIllustration } from '../../components/illustrations/CameraIllustration';

export function Camera() {
  const navigate = useNavigate();

  async function handleEnableCamera() {
    // Best-effort: on native this prompts the real OS permission dialog; on web
    // there's no persistent "permission" to request ahead of time (the browser
    // prompts at actual capture time), so this just no-ops there. Either way we
    // continue — the actual selfie step handles a denied/unavailable camera.
    try {
      await CapacitorCamera.requestPermissions();
    } catch {
      // no-op — web or unsupported platform
    }
    navigate('/onboarding/occasion');
  }

  return (
    <div
      style={{
        minHeight: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 22px 34px',
        background: 'linear-gradient(180deg, oklch(93% 0.035 255) 0%, var(--color-page-bg) 60%)',
      }}
    >
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
        <CameraIllustration />
        <h2 style={{ fontWeight: 600, fontSize: 21, marginTop: 2 }}>We need your camera</h2>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', maxWidth: 250, lineHeight: 1.5, margin: 0 }}>
          Your photo is processed entirely on your device. It's never uploaded, stored, or shared
          — it just helps us match looks to your face.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={handleEnableCamera}>
          Enable Camera
        </button>
        <button className="btn-ghost" style={{ padding: 6 }} onClick={() => navigate('/onboarding/occasion')}>
          Not now
        </button>
      </div>
    </div>
  );
}
