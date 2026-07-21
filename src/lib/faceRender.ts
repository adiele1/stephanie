import { FaceLandmarker, FilesetResolver, type NormalizedLandmark } from '@mediapipe/tasks-vision';

// Validated by the standalone spike (spike/face-render-spike.html) before this got built for
// real: MediaPipe Face Landmarker running on-device (WASM) + Canvas multiply/overlay blending
// produces a real, measurable color shift at the lips/cheeks without any ML training.

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
const RIGHT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];
const RIGHT_BROW = [70, 63, 105, 66, 107, 55, 65];
const LEFT_EYE_UPPER = [263, 466, 388, 387, 386, 385, 384, 398, 362];
const LEFT_BROW = [300, 293, 334, 296, 336, 285, 295];
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
) {
  ctx.save();
  ctx.globalCompositeOperation = composite;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = fillStyle;
  ctx.filter = 'blur(2px)';
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// MediaPipe FaceMesh has no explicit "eyelid" landmark group — approximate the lid/crease
// area by lofting the upper-eye contour up toward the brow.
function lidPolygon(
  landmarks: NormalizedLandmark[],
  eyeIdx: number[],
  browIdx: number[],
  w: number,
  h: number,
): Point[] {
  const eye = polygon(landmarks, eyeIdx, w, h);
  const brow = polygon(landmarks, browIdx, w, h);
  const lifted = eye.map(([x, y], i): Point => {
    const b = brow[Math.min(i, brow.length - 1)];
    return [x * 0.45 + b[0] * 0.55, y * 0.45 + b[1] * 0.55];
  });
  return [...eye, ...lifted.reverse()];
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

  fillPoly(ctx, polygon(landmarks, LIPS_OUTER, w, h), palette.lipColor, 'multiply', 0.75);
  fillPoly(ctx, lidPolygon(landmarks, RIGHT_EYE_UPPER, RIGHT_BROW, w, h), palette.shadowColor, 'overlay', 0.55);
  fillPoly(ctx, lidPolygon(landmarks, LEFT_EYE_UPPER, LEFT_BROW, w, h), palette.shadowColor, 'overlay', 0.55);

  for (const idx of [RIGHT_CHEEK, LEFT_CHEEK]) {
    const [cx, cy] = pt(landmarks, idx, w, h);
    const r = w * 0.09;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, palette.blushColor);
    grad.addColorStop(1, 'transparent');
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.5;
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
