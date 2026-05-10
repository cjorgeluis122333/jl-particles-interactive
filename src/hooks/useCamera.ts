import { useEffect, useRef, useState } from 'react';

export const useCamera = (isActive: boolean) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let isMounted = true;
    setCameraError(null);

    if (isActive) {
      if (!streamRef.current) {
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        }).then((stream) => {
          if (!isMounted) return;
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(e => {
               console.error("Video play error:", e);
               if (isMounted) setCameraError(e.message);
            });
          }
        }).catch(err => {
          console.error("Camera access error:", err);
          if (isMounted) setCameraError(err instanceof Error ? err.message : String(err));
        });
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isActive]);

  return { videoRef, cameraError };
};
