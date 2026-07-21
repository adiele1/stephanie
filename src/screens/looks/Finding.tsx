import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lottie, { type AnimationItem } from 'lottie-web';
// Loaded as a separate fetched asset (not inlined into the JS bundle) — it's 742KB of
// vector keyframe data, too big to want blocking the main chunk's parse/eval.
import findingAnimationUrl from '../../assets/finding-looks-animation.json?url';
import { useOnboarding } from '../../state/OnboardingContext';
import { useSession } from '../../state/SessionContext';
import { detectFaceLandmarks, loadImageFromFile } from '../../lib/faceRender';

const MESSAGES = ['Analyzing your skin tone...', 'Matching your features...', 'Curating your looks...'];
const MIN_MS = 3200; // "at least 3 seconds" + a small buffer

export function Finding() {
  const navigate = useNavigate();
  const { selfieFile } = useOnboarding();
  const { setSelfieImage, setLandmarks } = useSession();
  const mountRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    if (!selfieFile) {
      navigate('/onboarding/occasion', { replace: true });
      return;
    }

    let cancelled = false;
    let anim: AnimationItem | null = null;
    if (mountRef.current) {
      anim = lottie.loadAnimation({
        container: mountRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: findingAnimationUrl,
      });
    }

    const msgTimer = setInterval(() => {
      setMessage((prev) => MESSAGES[(MESSAGES.indexOf(prev) + 1) % MESSAGES.length]);
    }, Math.round(MIN_MS / 3));

    const minWait = new Promise((resolve) => setTimeout(resolve, MIN_MS));
    const detection = (async () => {
      const img = await loadImageFromFile(selfieFile);
      const landmarks = await detectFaceLandmarks(img);
      return { img, landmarks };
    })();

    Promise.all([minWait, detection]).then(([, { img, landmarks }]) => {
      if (cancelled) return;
      setSelfieImage(img);
      setLandmarks(landmarks);
      navigate('/looks/grid', { replace: true });
    });

    return () => {
      cancelled = true;
      clearInterval(msgTimer);
      anim?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfieFile]);

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
        padding: 40,
        background: 'linear-gradient(180deg, oklch(93% 0.035 255), var(--color-page-bg))',
      }}
    >
      <div ref={mountRef} style={{ width: 220, height: 220 }} />
      <p style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, textAlign: 'center' }}>
        {message}
      </p>
    </div>
  );
}
