import { useEffect, useRef, useState, RefObject } from 'react';
import { FilesetResolver, FaceLandmarker, Landmark } from '@mediapipe/tasks-vision';

export const useFaceTracking = (videoRef: RefObject<HTMLVideoElement | null>, isActive: boolean) => {
  const [faceLandmarks, setFaceLandmarks] = useState<Landmark[][]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const requestRef = useRef<number>(0);

  // Initialize Landmarker
  useEffect(() => {
    if (!isActive) {
      setFaceLandmarks([]);
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
          const landmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
              delegate: 'CPU',
            },
            outputFaceBlendshapes: false,
            runningMode: 'VIDEO',
            numFaces: 1,
          });
          if (!isMounted) return;
          landmarkerRef.current = landmarker;
        }
      } catch (err) {
        console.error('Error initializing Face Tracking:', err);
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
          if (results && results.faceLandmarks) {
            setFaceLandmarks(results.faceLandmarks);
          } else {
            setFaceLandmarks([]);
          }
        } catch (err) {
            // Ignore minor tracking errors
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

  return { faceLandmarks, faceIsInitializing: isInitializing, faceError: error };
};
