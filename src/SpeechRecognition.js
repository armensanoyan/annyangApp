import React, {useState, useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import * as distance from  'jaro-winkler' 

// const myCommands = ['create', 'node', 'name', 'give', 'type']
// const myCommands = ['create node', 'node', 'name', 'give name', 'give', 'type', 'give type']


export const Dictaphone = () => {
    const [messages, setMessages] = useState('')
    // var assumedWordsArray = []

    useEffect(() => {
        // const words = transcript.split(' ')
        // const assumedText = words.map(word => {

        //     var currentDistance = 0
        //     var assumedWord = ''
        //     var realWord = ''

        //     myCommands.forEach(command => {
        //         var dist = distance(command, word)
                
        //         if (dist > currentDistance) {
        //             currentDistance = dist
        //             assumedWord = command
        //             realWord = word
        //         }
        //     })
        //     console.log('currentDistance', currentDistance)
        //     if (currentDistance > 0.8) {
        //         // return {
        //         //     'currentDistance': currentDistance,
        //         //     'assumedWord': assumedWord,
        //         //     'realWOrd': realWord
        //         // }
        //         return assumedWord
        //     } else {
        //         return realWord
        //     }
        // })
        // console.log('assumedText', assumedText)
        // setMessages(assumedText.toString().replaceAll(',', ' '))
      });


    const commands = [
        {
            command: ['create node *'],
            callback: (speech) => {
                setMessages('do you want to create node ? '+speech)
            },
            matchInterim: true,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.6,
            bestMatchOnly: true
        },
        {
            command: ['give name *'],
            callback: (name) => {
                setMessages('do you want to give your node name '+name)
            },
            matchInterim: true,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
        {
            command: ['give type *'],
            callback: (speech) => {
                setMessages('do you want to give your node type '+speech)
            },
            matchInterim: true,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.6,
            bestMatchOnly: true
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
            <h1>{transcript}</h1>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
        </div>
    )
}