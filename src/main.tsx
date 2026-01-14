import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const rootElement = document.querySelector('#root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
