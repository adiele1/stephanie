import { useEffect, useRef } from 'react';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { renderLookOnCanvas, type LookPalette } from '../lib/faceRender';

/** Full, uncropped view of a rendered look — the card/hero previews elsewhere use
 *  object-fit:cover in a short box for a nice banner, which necessarily crops a
 *  portrait photo (often right through the mouth, the one part of the face a "look"
 *  most needs to show). This shows the whole rendered photo, letterboxed instead of
 *  cropped, so nothing gets cut off. */
export function LookFullscreenViewer({
  image,
  landmarks,
  palette,
  lookName,
  onClose,
}: {
  image: HTMLImageElement;
  landmarks: NormalizedLandmark[] | null;
  palette: LookPalette;
  lookName: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderLookOnCanvas(canvasRef.current, image, landmarks, palette);
    }
  }, [image, landmarks, palette]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'oklch(15% 0.02 260 / 0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
      <p
        style={{
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 16,
          margin: '0 0 14px',
        }}
      >
        {lookName}
      </p>
      <canvas
        ref={canvasRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: 'calc(100vh - 140px)',
          width: 'auto',
          height: 'auto',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12.5, marginTop: 16 }}>Tap anywhere to close</p>
    </div>
  );
}
