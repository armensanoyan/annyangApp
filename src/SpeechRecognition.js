import React, {useState, useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import * as distance from  'jaro-winkler' 

const myCommands = ['create', 'node', 'name', 'give', 'type']
// const myCommands = ['create node', 'node', 'name', 'give name', 'give', 'type', 'give type']


export const Dictaphone = () => {
    useEffect(() => {
        const mathcesArray = myCommands.map(com => {
            const words = transcript.split(' ')
            return ( words.map(word => {
                const evaluate = distance(word, com)
                if(evaluate > 0.8) return {'word':word, 'com':com}
            }))
            const countDistance = distance(com, transcript)
            return [countDistance, com]
            })
        console.log(mathcesArray)
        document.title = transcript;
      });


    var countDistance = 0
    const [messages, setMessages] = useState('')
    const commands = [
        {
            command: ['*create node *', ' *create nodes *', '*create note *', 'create node *', 'crate node', 'crate note'],
            callback: (speech) => {
                setMessages('COMMAND!!! '+speech)
                console.log('got an command')
            }
        }
    ]
    const {transcript} = useSpeechRecognition({commands})
    // const {transcript, resetTranscript } = useSpeechRecognition()

    if(!SpeechRecognition.browserSupportsSpeechRecognition) {
        console.log("browser doesn't support")
        return null
    }

    return (
        <div>
            <h1>{messages}</h1>
            <p>{transcript}</p>
            <p>{distance('create', transcript)}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
        </div>
    )
}