import { FaceLandmarker, FilesetResolver, type NormalizedLandmark } from '@mediapipe/tasks-vision';

// Validated by the standalone spike (spike/face-render-spike.html) before this got built for
// real: MediaPipe Face Landmarker running on-device (WASM) + Canvas blend-mode compositing
// produces a real, measurable color shift at the lips/cheeks without any ML training.
//
// Rendering technique (v2, after the first pass looked like a smudge rather than makeup):
// the eyeshadow region used to be a crude interpolation between the eye contour and the
// eyebrow, which overshot onto the brow itself. Replaced with the EYESHADOW_LEFT/RIGHT
// landmark sets from a working reference implementation (github.com/Jayanths9/Virtual_Makeup,
// MediaPipe FaceMesh + OpenCV) that traces an actual lid-shaped region. Blend modes were
// also reconsidered: lips use the CSS/Canvas 'color' compositing mode (recolors hue+
// saturation while preserving the lip's own luminosity/shine — much closer to how tinted
// cosmetics actually look than a flat multiply), eyeshadow uses 'multiply' at a lower
// alpha with heavier, resolution-scaled feathering so it reads as blended pigment rather
// than a hard-edged fill.

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm',
      );
      return FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate: 'GPU',
        },
        outputFaceBlendshapes: false,
        runningMode: 'IMAGE',
        numFaces: 1,
      });
    })();
  }
  return landmarkerPromise;
}

/** Detects face landmarks once — the caller should cache the result and reuse it across
 *  every look's render pass rather than re-running detection per look. */
export async function detectFaceLandmarks(
  image: HTMLImageElement,
): Promise<NormalizedLandmark[] | null> {
  const landmarker = await getFaceLandmarker();
  const result = landmarker.detect(image);
  return result.faceLandmarks?.[0] ?? null;
}

// Canonical MediaPipe FaceMesh index polygons — documented, not invented.
const LIPS_OUTER = [
  61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61,
];
// Dedicated eyeshadow contours (not the eye-opening contour itself) — traces a proper
// lid-shaped region between the lash line and crease, staying clear of the eyebrow.
const EYESHADOW_RIGHT = [
  226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246, 33, 130, 226,
];
const EYESHADOW_LEFT = [
  463, 414, 286, 258, 257, 259, 260, 467, 446, 359, 263, 466, 388, 387, 386, 385, 384, 398, 362, 463,
];
const RIGHT_CHEEK = 205;
const LEFT_CHEEK = 425;

export interface LookPalette {
  lipColor: string;
  shadowColor: string;
  blushColor: string;
}

type Point = [number, number];

function pt(landmarks: NormalizedLandmark[], idx: number, w: number, h: number): Point {
  const p = landmarks[idx];
  return [p.x * w, p.y * h];
}
function polygon(landmarks: NormalizedLandmark[], indices: number[], w: number, h: number): Point[] {
  return indices.map((i) => pt(landmarks, i, w, h));
}
function fillPoly(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  fillStyle: string,
  composite: GlobalCompositeOperation,
  alpha: number,
  blurPx: number,
) {
  ctx.save();
  ctx.globalCompositeOperation = composite;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = fillStyle;
  ctx.filter = `blur(${blurPx}px)`;
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Paints a look's lip/eyeshadow/blush recipe onto `canvas`, drawing `image` as the base
 *  layer first. Pass the landmarks detected once by `detectFaceLandmarks`. If landmarks is
 *  null (no face found), the canvas just shows the plain photo. */
export function renderLookOnCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  landmarks: NormalizedLandmark[] | null,
  palette: LookPalette,
) {
  const w = image.naturalWidth || image.width;
  const h = image.naturalHeight || image.height;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(image, 0, 0, w, h);

  if (!landmarks) return;

  // Blur scales with the photo's resolution — a fixed pixel blur reads as sharp on a
  // high-res selfie and mushy on a small one. 'color' mode recolors hue+saturation while
  // keeping the lips' own shading/shine, which looks like tinted lips rather than paint.
  const lipBlur = Math.max(3, w * 0.006);
  const eyeBlur = Math.max(3, w * 0.006);
  const blushBlur = Math.max(4, w * 0.01);

  fillPoly(ctx, polygon(landmarks, LIPS_OUTER, w, h), palette.lipColor, 'color', 0.85, lipBlur);
  fillPoly(ctx, polygon(landmarks, EYESHADOW_RIGHT, w, h), palette.shadowColor, 'multiply', 0.5, eyeBlur);
  fillPoly(ctx, polygon(landmarks, EYESHADOW_LEFT, w, h), palette.shadowColor, 'multiply', 0.5, eyeBlur);

  for (const idx of [RIGHT_CHEEK, LEFT_CHEEK]) {
    const [cx, cy] = pt(landmarks, idx, w, h);
    const r = w * 0.09;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, palette.blushColor);
    grad.addColorStop(1, 'transparent');
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.45;
    ctx.filter = `blur(${blushBlur}px)`;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
