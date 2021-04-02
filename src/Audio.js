import { ReactMic } from 'react-mic';
import React, {Component} from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

export default class Audio extends Component {
    constructor(props) {
      super(props)
   
      this.state = {
        recordState: null,
      }
    }
   
    start = () => {
      this.setState({
        recordState: RecordState.START
      })

    }
   
    stop = () => {
      this.setState({
        recordState: RecordState.STOP
      })
    }
   
    //audioData contains blob and blobUrl http://127.0.0.1:8000/
    onStop = audioData => {
        console.log('audioData', audioData)

    //   fetch(`http://127.0.0.1:8000/`, {
    //       method:"POST", 
    //       body:{'audioData':audioData}, 
    //       headers: {
    //        'Content-Type': 'application/json'
    //       }
    //     })
    //   .then(response => response)
    //   .then(e => console.log(e))

    const xml = new XMLHttpRequest()

    // var fd=new FormData();
    // fd.append("filename.wav", audioData);
    // xml.open("POST","http://127.0.0.1:8000/",true);
    // xml.send(`data=${fd}`);

    xml.onreadystatechange = response => console.log('--ready--', response)
    xml.open('POST', `http://127.0.0.1:8000/`, true)
    xml.setRequestHeader("Content-Type", 'application/json');

    const wav = new Blob([audioData.blob], { 'type' : 'audio/wav; codecs=MS_PCM' });
    console.log('wav', wav)

    xml.send(wav);
    }
   
    render() {
      const { recordState } = this.state
   
      return (
        <div>
          <AudioReactRecorder state={recordState} onStop={this.onStop} />
   
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
        </div>
      )
    }
  }