import { createRoot } from 'react-dom/client'
import './index.css'
import PentatonicSynth from './components/PentatonicSynth.tsx'

createRoot(document.getElementById('root')!).render(
  <PentatonicSynth />
)
