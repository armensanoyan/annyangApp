import {useState} from 'react'
import * as distance from  'jaro-winkler' 
import StyledNodeCreateWindow from './NodeCard'
const DISTANCE_SCALE = 0.6

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

var commands = ['create node', ];
var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


function CreatNode() {
    const [message, setMessage] = useState('')
    const [state, setSate] = useState({
        command: false,
        name: null,
        type: null,
    })

    recognition.onresult = event => {
        const result = event.results[0][0].transcript
        setMessage(result)
        const countDistance = distance(commands[0], result)
        
        if (state.type !== null) {
            if (result === 'yes') {
                startSpeaking('the node is created')
                setSate({ ...state,
                    command: false,
                    name: null,
                    type: null,
                })
            } 

        } else if (state.name !== null) {
            startSpeaking('the type is '+result+ 'do you want me to save it')
            setSate({ ...state, type: result})

        } else if (state.command === true) {
            startSpeaking('created node with name '+result+'. please give it a type')
            setSate({ ...state, name: result})

        } else if (countDistance > DISTANCE_SCALE) {
            startSpeaking('creating a node, please give a name')
            setSate({ ...state, command: true})

        } else {
            console.log('zero', result)
            startSpeaking(result)
        }
    }

    const startRecording = () => {
        recognition.start()
    }
    const endRecording = (e) => {
        recognition.stop()
    }

    recognition.onspeechend = function(e) {
        console.log('onspeechend', e)
    }
    recognition.onnomatch = function(event) {
        setMessage("onnomatch: I didn't recognise that command.")
    }
    recognition.onerror = function(event) {
        recognition.stop();
        setMessage('Error occurred in recognition: ' + event.error)
    }

    const startSpeaking = (speech = message) => {
        recognition.stop();
        const synth = window.speechSynthesis
        const util = new SpeechSynthesisUtterance(speech)
        util.voice = speechSynthesis.getVoices()[50]
        synth.speak(util)
    }

    return (
        <div>
            <StyledNodeCreateWindow state={state} setState={setSate} />
            <button onClick={startRecording}>Listen</button>
            <button onClick={endRecording}>Stop</button>
        </div>
    )
}

export default CreatNode
