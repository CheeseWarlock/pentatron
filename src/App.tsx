import './App.css'
import PentatonicScale from './PentatonicScale'
import NoteGrid from './NoteGrid'
import { PentatonicScaleBuilder } from './components/PentatonicScaleBuilder'
import RootSelector from './components/RootSelector'

function App() {

  const scale = new PentatonicScale(440, [2, 4, 7, 11]);

  return (
    <>
    <RootSelector />
    <PentatonicScaleBuilder />
      <div className="card">
        <NoteGrid scale={scale} />
      </div>
    </>
  )
}

export default App
