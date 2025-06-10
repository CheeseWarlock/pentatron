import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './Note'
import PentatonicScale from './PentatonicScale'
import { Synth } from 'tone'

function App() {
  const [count, setCount] = useState(0)
  const scale = new PentatonicScale(440, [0, 2, 4, 5, 7, 9, 11]);

  //create a synth and connect it to the main output (your speakers)
const synth = new Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");

  return (
    <>
      <div>
        {scale.getNotes(250, 1000).reverse().map(frequency => <Note frequency={frequency} />)}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
