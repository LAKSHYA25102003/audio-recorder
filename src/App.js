import React, { useState, useEffect } from 'react';

function App () {
  const [recording, setRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener('dataavailable', (event) => {
          setAudioChunks((chunks) => [...chunks, event.data]);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();

          setAudioStream(null);
          setAudioChunks([]);
          setRecording(false);

          const link = document.createElement('a');
          link.href = audioUrl;
          link.download = 'recording.mp3';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });

        mediaRecorder.start();

        setRecording(true);
        setAudioStream(stream);
      })
      .catch((error) => console.error(error));
  };

  const handleStopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      handleStopRecording();
    };
  }, []);

  return (
    <div>
      {recording ? (
        <button className='border-[2px] rounded-md bg-red-400 text-white border-red-400' onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button className='border-[2px] rounded-md bg-red-400 text-white border-red-400' onClick={handleStartRecording}>Start Recording</button>
      )}
    </div>
  );
};

export default App;

