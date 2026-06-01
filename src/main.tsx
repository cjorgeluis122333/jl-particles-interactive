import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import './index.css';

// Filter out internal MediaPipe / TensorFlow Lite informational logs and warnings
// that are not relevant to the application's functionality.
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

const shouldFilter = (args: any[]) => {
  const logStr = args.map(String).join(' ');
  return logStr.includes('Created TensorFlow Lite XNNPACK delegate') ||
         logStr.includes('gl_context.cc') ||
         logStr.includes('inference_feedback_manager.cc') ||
         logStr.includes('landmark_projection_calculator.cc') ||
         logStr.includes('face_landmarker_graph.cc') ||
         logStr.includes('Graph successfully started running');
};

console.info = (...args) => {
  if (shouldFilter(args)) return;
  originalConsoleInfo(...args);
};

console.warn = (...args) => {
  if (shouldFilter(args)) return;
  originalConsoleWarn(...args);
};

console.log = (...args) => {
  if (shouldFilter(args)) return;
  originalConsoleLog(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
