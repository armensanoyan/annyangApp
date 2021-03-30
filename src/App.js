import './App.css';

import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SpeechRecognitionPolyfill from 'speech-recognition-aws-polyfill'

const Dictaphone = () => {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'create note *',
      callback: (node) => setMessage(`your node name is: ${node}`)
    },
    {
      command: 'create node *',
      callback: (node) => setMessage(`your node name is: ${node}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  SpeechRecognition.startListening()
  SpeechRecognition.getRecognition((e) => console.log(e))

  return (
    <div>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  )
}

function App() {
 
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {

    const recognition = new SpeechRecognitionPolyfill({
      IdentityPoolId: 'eu-west-1:11111111-1111-1111-1111-1111111111', // your Identity Pool ID
      region: 'eu-west-1' // your AWS region
    })

    console.log('not supported')
    // SpeechRecognition.applyPolyfill(SpeechRecognitionPolyfill)
    return null
  } else {
    console.log('supported')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome </h1>
        <Dictaphone />
      </header>
    </div>
  );
}

export default App;
