function App() {


  let audioRecorder = {
    audioBlobs: [],
    mediaRecorder: null,
    streamBeingCaptured: null,

    start: () => {
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
      }
      else {
        return navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            audioRecorder.streamBeingCaptured = stream;


            audioRecorder.mediaRecorder = new MediaRecorder(stream);


            audioRecorder.audioBlobs = [];


            audioRecorder.mediaRecorder.addEventListener("dataavailable", event => {

              audioRecorder.audioBlobs.push(event.data);
            });


            audioRecorder.mediaRecorder.start();
          });
      }
    },
    
    
  }

  const startAudioRecording = () => {
    audioRecorder.start()
      .then(() => {
        console.log("Recording Audio...")
      })
      .catch(error => {
        if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {
          console.log("To record audio, use browsers like Chrome and Firefox.");
          
          switch (error.name) {
            case 'AbortError': //error from navigator.mediaDevices.getUserMedia
              console.log("An AbortError has occured.");
              break;
            case 'NotAllowedError': //error from navigator.mediaDevices.getUserMedia
              console.log("A NotAllowedError has occured. User might have denied permission.");
              break;
            case 'NotFoundError': //error from navigator.mediaDevices.getUserMedia
              console.log("A NotFoundError has occured.");
              break;
            case 'NotReadableError': //error from navigator.mediaDevices.getUserMedia
              console.log("A NotReadableError has occured.");
              break;
            case 'SecurityError': //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
              console.log("A SecurityError has occured.");
              break;
            case 'TypeError': //error from navigator.mediaDevices.getUserMedia
              console.log("A TypeError has occured.");
              break;
            case 'InvalidStateError': //error from the MediaRecorder.start
              console.log("An InvalidStateError has occured.");
              break;
            case 'UnknownError': //error from the MediaRecorder.start
              console.log("An UnknownError has occured.");
              break;
            default:
              console.log("An error occured with the error name " + error.name);
          };
        };
      });
  }

  return (
    <div className="App text-center text-[24px] font-bold p-[10px]">
      lakshya
    </div>
  );
}

export default App;
