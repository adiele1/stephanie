import { useEffect, useRef } from 'react';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { renderLookOnCanvas, type LookPalette } from '../lib/faceRender';

/** Renders `image` with `palette`'s lip/eyeshadow/blush recipe painted on using the
 *  already-detected `landmarks` — no re-detection per card, detection ran once on the
 *  Finding screen. */
export function LookRenderCanvas({
  image,
  landmarks,
  palette,
  style,
}: {
  image: HTMLImageElement;
  landmarks: NormalizedLandmark[] | null;
  palette: LookPalette;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderLookOnCanvas(canvasRef.current, image, landmarks, palette);
    }
  }, [image, landmarks, palette]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
