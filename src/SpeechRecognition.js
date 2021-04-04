import React, {useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


export const Dictaphone = () => {
    const [messages, setMessages] = useState('default message')
    const [state, setState] = useState({
        createNode: false,
        name: null,
        type: null
    })

    const commands = [
        {
            command: 'create node',
            callback: () => {
                console.log('SpeechRecognition', SpeechRecognition)
                SpeechRecognition.stopListening()
                SpeechRecognition.abortListening()
                setMessages('got command')

                const ut = new SpeechSynthesisUtterance(transcript)
                ut.voice = speechSynthesis.getVoices()[50]
                console.log('transcript', transcript)
                speechSynthesis.speak(ut)
            },
            matchInterim: true,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.7,
            bestMatchOnly: true
        },
    ]
    const {transcript} = useSpeechRecognition({commands})

    if(!SpeechRecognition.browserSupportsSpeechRecognition) {
        console.log("browser doesn't support")
        return null
    }

    const speakToMe = () => {
        const util = new SpeechSynthesisUtterance(messages)
        util.voice = speechSynthesis.getVoices()[50]
        speechSynthesis.speak(util)
        console.log('speechSynthesis', speechSynthesis)
    }

    return (
        <div>
            <h1>{messages}</h1>
            <p>{transcript}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={speakToMe}>Spell</button>
        </div>
    )
}