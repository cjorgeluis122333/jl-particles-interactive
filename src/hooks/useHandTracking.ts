import { useEffect, useRef, useState, RefObject } from 'react';
import { FilesetResolver, HandLandmarker, Landmark } from '@mediapipe/tasks-vision';

export const useHandTracking = (videoRef: RefObject<HTMLVideoElement | null>, isActive: boolean) => {
  const [handLandmarks, setHandLandmarks] = useState<Landmark[][]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number>(0);

  // Initialize Landmarker
  useEffect(() => {
    if (!isActive) {
      setHandLandmarks([]);
      return;
    }

    let isMounted = true;
    const init = async () => {
      try {
        setIsInitializing(true);
        setError(null);
        if (!landmarkerRef.current) {
          const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
          );
          const landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
              delegate: 'CPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
          });
          if (!isMounted) return;
          landmarkerRef.current = landmarker;
        }
      } catch (err) {
        console.error('Error initializing Hand Tracking:', err);
        if (isMounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [isActive]);

  // Detection loop
  useEffect(() => {
    if (!isActive) return;

    let isMounted = true;
    const detect = () => {
      if (!videoRef.current || !landmarkerRef.current || !isMounted) {
        requestRef.current = requestAnimationFrame(detect);
        return;
      }

      const video = videoRef.current;
      if (video.currentTime > 0) {
        try {
          const results = landmarkerRef.current.detectForVideo(video, performance.now());
          if (results && results.landmarks) {
            setHandLandmarks(results.landmarks);
          } else {
            setHandLandmarks([]);
          }
        } catch (err) {
            // Ignore minor tracking errors, sometimes elements aren't ready
        }
      }
      requestRef.current = requestAnimationFrame(detect);
    };

    requestRef.current = requestAnimationFrame(detect);

    return () => {
      isMounted = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, videoRef]);

  return { handLandmarks, handIsInitializing: isInitializing, handError: error };
};
