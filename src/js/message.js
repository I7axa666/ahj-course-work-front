import defaultImg from '../img/file.png';
import saveAttach from './utilits/saveAttach';
import Sender from './utilits/sender';

export default class Message {
  static newMessage(msgObject) {
    // debugger
    let value = msgObject.text;
    const links = Array.from(value.matchAll(/http[s]?:\/\/[^\s]+/g));
    links.forEach((link) => value = value.replace(link[0], `<a onclick="window.open('${link[0]}')" href="#">${link[0]}</a>`));
    const newMessage = document.createElement('div');
    newMessage.classList.add('message-container');
    const div = document.createElement('div');
    div.innerHTML = value;
    div.classList.add('message');
    const btn = document.createElement('button');
    btn.classList.add('favorite-on');
    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }
    newMessage.append(div);
    newMessage.append(btn);

    btn.addEventListener('click', () => {
      if (btn.textContent === 'In favorite') {
        btn.textContent = 'Not in favorite';
      } else {
        btn.textContent = 'In favorite';
      }

      Sender.sendFavorite(msgObject.id);
    });

    return newMessage;
  }

  static newImgMessage(msgObject) {
    const { text } = msgObject;
    const link = msgObject.attach;
    const newMessage = document.createElement('div');
    const a = document.createElement('a');
    const btn = document.createElement('button');
    btn.classList.add('favorite-on');
    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }

    a.innerHTML = text;
    a.href = link;
    a.download = text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      saveAttach(link, text);
    });

    newMessage.classList.add('message-container');
    const img = document.createElement('img');
    img.src = link;
    img.alt = text;
    img.classList.add('message-img');
    newMessage.append(img);
    newMessage.append(a);
    newMessage.append(btn);

    btn.addEventListener('click', () => {
      if (btn.textContent === 'In favorite') {
        btn.textContent = 'Not in favorite';
      } else {
        btn.textContent = 'In favorite';
      }
      Sender.sendFavorite(msgObject.id);
    });

    return newMessage;
  }

  static newAudioMessage(msgObject) {
    const { text } = msgObject;
    const link = msgObject.attach;
    const newMessage = document.createElement('div');
    const a = document.createElement('a');
    const btn = document.createElement('button');
    btn.classList.add('favorite-on');

    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }

    a.innerHTML = text;
    a.href = link;
    a.download = text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      saveAttach(link, text);
    });
    newMessage.classList.add('message-container');
    const audio = document.createElement('audio');
    audio.src = link;
    audio.controls = true;
    newMessage.append(audio);
    newMessage.append(a);
    newMessage.append(btn);

    btn.addEventListener('click', () => {
      if (btn.textContent === 'In favorite') {
        btn.textContent = 'Not in favorite';
      } else {
        btn.textContent = 'In favorite';
      }
      Sender.sendFavorite(msgObject.id);
    });

    return newMessage;
  }

  static newVideoMessage(msgObject) {
    const { text } = msgObject;
    const link = msgObject.attach;
    const newMessage = document.createElement('div');
    const a = document.createElement('a');
    const btn = document.createElement('button');
    btn.classList.add('favorite-on');

    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }

    a.innerHTML = text;
    a.href = link;
    a.download = text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      saveAttach(link, text);
    });
    newMessage.classList.add('message-container');
    const video = document.createElement('video');
    video.src = link;
    video.controls = true;
    newMessage.append(video);
    newMessage.append(a);
    newMessage.append(btn);

    btn.addEventListener('click', () => {
      if (btn.textContent === 'In favorite') {
        btn.textContent = 'Not in favorite';
      } else {
        btn.textContent = 'In favorite';
      }
      Sender.sendFavorite(msgObject.id);
    });

    return newMessage;
  }

  static newOtherMessage(msgObject) {
    const { text } = msgObject;
    const link = msgObject.attach;
    const newMessage = document.createElement('div');
    newMessage.classList.add('message-container');
    const other = document.createElement('img');
    const btn = document.createElement('button');
    btn.classList.add('favorite-on');

    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }
    other.src = defaultImg;
    other.alt = text;
    other.classList.add('message-img');

    const a = document.createElement('a');

    a.innerHTML = text;
    a.href = link;
    a.download = text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      saveAttach(link, text);
    });
    newMessage.append(other);
    newMessage.append(a);
    newMessage.append(btn);

    btn.addEventListener('click', () => {
      if (btn.textContent === 'In favorite') {
        btn.textContent = 'Not in favorite';
      } else {
        btn.textContent = 'In favorite';
      }
      Sender.sendFavorite(msgObject.id);
    });

    return newMessage;
  }
}
