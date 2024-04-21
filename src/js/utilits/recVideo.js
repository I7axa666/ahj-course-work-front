const recVideo = async () => {
  const stopBtn = document.querySelector('.stop-video');
  const parentElement = document.querySelector('.organaizer');
  const videoPlayer = document.createElement('video');

  videoPlayer.classList.add('video-stream');
  videoPlayer.setAttribute('controls', 'controls');
  parentElement.appendChild(videoPlayer);

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch {
    alert('Необходимо разрешение для использования камеры');
    return;
  }

  videoPlayer.srcObject = await stream;

  const play = () => {
    videoPlayer.play();
    videoPlayer.muted = true;
  };

  videoPlayer.addEventListener('canplay', play);

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener('start', () => {
    console.log('recording started');
  });

  recorder.addEventListener('dataavailable', (e) => {
    chunks.push(e.data);
  });

  let blob;

  recorder.addEventListener('stop', () => {
    blob = new Blob(chunks, { type: 'video/webm' });
    const videoURL = URL.createObjectURL(blob);
    const video = document.createElement('video');
    video.setAttribute('controls', 'controls');
    video.src = videoURL;
    videoPlayer.remove();
    parentElement.appendChild(video);
  });

  stopBtn.addEventListener('click', () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    videoPlayer.removeEventListener('canplay', play);
  });

  recorder.start();

  const sendButton = document.querySelector('send-video');

  sendButton.addEventListener('click', () => {

  });
};

export default recVideo;
