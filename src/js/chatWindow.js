import Sender from './utilits/sender';
import fileToString from './utilits/fileToString';
import PreviewAttach from './components/previewAttach';
// import recVideo from "./utilits/recVideo";
import blobToBase64 from './utilits/blobToBase64';
import FavoriteWindow from './components/favoriteWindow';

export default class ChatWIndow {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.sender = undefined;
    this.myFile = null;
    this.blob = null;

    this.sendMessage = this.sendMessage.bind(this);
    this.send = this.send.bind(this);
    this.attach = this.attach.bind(this);
    this.recVideo = this.recVideo.bind(this);
    this.recAudio = this.recAudio.bind(this);
    this.showFavorite = this.showFavorite.bind(this);
  }

  init() {
    this.parentElement.innerHTML = `
    <div class="chat-window"></div>
    <div class="chat-input">
      <input id="input-message" placeholder="Введите сообщение"></input>
      <div class="buttons">
        <button class="send-btn">Send</button>
        <form id="form-attach" class="attach-container">
          <input name="attach" type="file" class="attach-input">
          <span class="attach-icon">+</span>
        </form>
        <button type="submit" form="form-attach" class="upload-btn">Upload</button>
        <button class="video-btn">Rec Video</button>
        <button class="stop-video">stop Video</button>
        <button class="send-video">send Video</button>
        <button class="audio-btn">Rec Audio</button>
        <button class="stop-audio">stop Audio</button>
        <button class="send-audio">send Audio</button>
        <button class="favorite-btn">show Favorite</button>
        <button class="cancle-btn">Cancel</button>
      </div> 
    </div>
    `;

    this.sender = new Sender();

    this.sendMessage();
    this.attach();
    this.draggable();
    this.recVideo();
    this.recAudio();
    this.showFavorite();
  }

  sendMessage() {
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.addEventListener('click', this.send);

    document.querySelector('#input-message').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.send();
      }
    });
  }

  send() {
    const message = document.querySelector('#input-message').value;
    if (message.trim() === '') return;
    document.querySelector('#input-message').value = '';

    this.sender.sendTxt(message);
  }

  attach() {
    const attachForm = this.parentElement.querySelector('.attach-container');
    const attachInput = this.parentElement.querySelector('.attach-input');

    attachForm.addEventListener('click', () => {
      attachInput.dispatchEvent(new MouseEvent('click'));
    });

    attachInput.addEventListener('change', () => {
      this.myFile = attachInput.files && attachInput.files[0];
      let fileType = this.myFile.type.substring(0, this.myFile.type.indexOf('/'));
      if (!fileType) { fileType = 'other'; }
      // console.log(fileType);
      if (!this.myFile) return;

      PreviewAttach.create(this.parentElement, this.myFile);

      attachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.myFile) {
          alert('Выберите файл');
          return;
        }

        fileToString(this.myFile, (fileData) => {
          this.sender.sendAttach({
            type: fileType,
            file: fileData,
            fileName: this.myFile.name,
          });
          document.querySelector('.preview').remove();
          this.myFile = null;
        });
      });
    });
  }

  draggable() {
    const chatWindow = this.parentElement.querySelector('.chat-window');

    chatWindow.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    chatWindow.addEventListener('drop', (e) => {
      e.preventDefault();

      this.myFile = e.dataTransfer.files && e.dataTransfer.files[0];
      // console.log(this.myFile)
      let fileType = this.myFile.type.substring(0, this.myFile.type.indexOf('/'));
      if (!fileType) { fileType = 'other'; }
      PreviewAttach.create(this.parentElement, this.myFile);
      const uploadBtn = document.querySelector('.upload-btn');

      const sendDrudAttach = () => {
        fileToString(this.myFile, (fileData) => {
          this.sender.sendAttach({
            type: fileType,
            file: fileData,
            fileName: this.myFile.name,
          });
          document.querySelector('.preview').remove();
          this.myFile = null;
        });
        uploadBtn.removeEventListener('click', sendDrudAttach);
      };

      uploadBtn.addEventListener('click', sendDrudAttach);
    });
  }

  recVideo() {
    const videoBtn = this.parentElement.querySelector('.video-btn');
    videoBtn.addEventListener('click', async () => {
      // console.log('rec');
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

      // recorder.addEventListener('start', () => {
      //   console.log('recording started');
      // });

      recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });

      recorder.addEventListener('stop', () => {
        this.blob = new Blob(chunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(this.blob);
        const video = document.createElement('video');
        video.classList.add('video-preview');
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
    });

    const sendButton = document.querySelector('.send-video');

    sendButton.addEventListener('click', () => {
      if (!this.blob) return;
      blobToBase64(this.blob)
        .then((fileData) => {
          this.sender.sendAttach({
            type: 'video',
            file: fileData,
            fileName: 'newVideo.webm',
          });
          const video = document.querySelector('.video-preview');
          video.remove();
        });

      this.blob = null;
    });
  }

  recAudio() {
    const videoBtn = this.parentElement.querySelector('.audio-btn');
    videoBtn.addEventListener('click', async () => {
      const stopBtn = document.querySelector('.stop-audio');
      const parentElement = document.querySelector('.organaizer');
      const audioPlayer = document.createElement('audio');

      audioPlayer.classList.add('audio-stream');
      audioPlayer.setAttribute('controls', 'controls');
      parentElement.appendChild(audioPlayer);

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      } catch {
        alert('Необходимо разрешение для использования камеры');
        return;
      }

      audioPlayer.srcObject = await stream;

      const play = () => {
        audioPlayer.play();
        audioPlayer.muted = true;
      };

      audioPlayer.addEventListener('canplay', play);

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      // recorder.addEventListener('start', () => {
      //   console.log('recording started');
      // });

      recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });

      recorder.addEventListener('stop', () => {
        this.blob = new Blob(chunks, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(this.blob);
        const audio = document.createElement('audio');
        audio.classList.add('audio-preview');
        audio.setAttribute('controls', 'controls');
        audio.src = audioURL;
        audioPlayer.remove();
        parentElement.appendChild(audio);
      });

      stopBtn.addEventListener('click', () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        audioPlayer.removeEventListener('canplay', play);
      });

      recorder.start();
    });

    const sendButton = document.querySelector('.send-audio');

    sendButton.addEventListener('click', () => {
      if (!this.blob) return;
      blobToBase64(this.blob)
        .then((fileData) => {
          this.sender.sendAttach({
            type: 'audio',
            file: fileData,
            fileName: 'newAudio.webm',
          });
          const audio = document.querySelector('.audio-preview');
          audio.remove();
        });

      this.blob = null;
    });
  }

  showFavorite() {
    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => {
      FavoriteWindow.show(this.sender);
    });
  }
}
