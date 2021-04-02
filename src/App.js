import React, {useState} from 'react'
import './App.css'
import {Dictaphone} from './SpeechRecognition.js'

var constraints = window.constraints = {
  audio: true,
  video: false
};

function App() {
  const [haveMicrophone, setHaveMicrophone] = useState(false)
 
  navigator.mediaDevices.enumerateDevices()
    .then(res =>{
      res.find(e => {
        if (e.kind == 'audioinput') setHaveMicrophone(true)
      })
    })

    const display = haveMicrophone == true ? <Dictaphone /> : <h1>Please connect microphone</h1>

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
