import React, {useState} from 'react'
import './App.css'
import CreateNode from './CreateNode'


function App() {
  const [haveMicrophone, setHaveMicrophone] = useState(false)

  navigator.mediaDevices.enumerateDevices()
    .then(res =>{
      res.find(e => {
        if (e.kind === 'audioinput') setHaveMicrophone(true)
        return null
      })
    })

  const display = haveMicrophone === true ? <CreateNode /> : <h1>Please connect microphone</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome </h1>
        {display}
      </header>
    </div>
  );
}

export default App;
