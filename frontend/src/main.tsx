import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import './components/animations/ProductCardAnimations.css'
import './components/ProductCardSkeleton.css'
import './components/styles/ProductSectionVisibility.css'

createRoot(document.getElementById("root")!).render(<App />);
