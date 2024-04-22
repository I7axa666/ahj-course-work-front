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

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('pin-btn');
    pinBtn.innerHTML = 'Pin';
    // pinBtn.addEventListener('click', () => {
    //   Sender.sendPin(msgObject.id);
    // });
    newMessage.append(pinBtn);
    newMessage.append(div);
    newMessage.append(btn);

    pinBtn.addEventListener('click', () => {
      // console.log('pin');
      if (newMessage.classList.contains('pinned')) {
        newMessage.classList.remove('pinned');
      } else {
        newMessage.classList.add('pinned');
      }
      Sender.pinMessage(msgObject.id);
    });

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

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('pin-btn');
    pinBtn.innerHTML = 'Pin';

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
    const previeDiv = document.createElement('div');
    previeDiv.classList.add('preview-msg');
    newMessage.classList.add('message-container');
    const img = document.createElement('img');
    img.src = link;
    img.alt = text;
    img.classList.add('message-img');
    previeDiv.append(img);
    previeDiv.append(a);
    newMessage.append(pinBtn);
    newMessage.append(previeDiv);
    newMessage.append(btn);

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

    pinBtn.addEventListener('click', () => {
      if (document.querySelector('.pinned')) {
        document.querySelector('.pinned').classList.remove('pinned');
      }
      newMessage.classList.add('pinned');
      Sender.pinMessage(msgObject.id);
    });

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

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('pin-btn');
    pinBtn.innerHTML = 'Pin';

    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

    const previeDiv = document.createElement('div');
    previeDiv.classList.add('preview-msg');

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
    previeDiv.append(audio);
    previeDiv.append(a);
    newMessage.append(pinBtn);
    newMessage.append(previeDiv);
    newMessage.append(btn);

    pinBtn.addEventListener('click', () => {
      if (document.querySelector('.pinned')) {
        document.querySelector('.pinned').classList.remove('pinned');
      }
      newMessage.classList.add('pinned');
      Sender.pinMessage(msgObject.id);
    });

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

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

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('pin-btn');
    pinBtn.innerHTML = 'Pin';

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

    const previeDiv = document.createElement('div');
    previeDiv.classList.add('preview-msg');
    newMessage.classList.add('message-container');
    const video = document.createElement('video');
    video.src = link;
    video.controls = true;
    previeDiv.append(video);
    previeDiv.append(a);
    newMessage.append(pinBtn);
    newMessage.append(previeDiv);
    newMessage.append(btn);

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

    pinBtn.addEventListener('click', () => {
      if (document.querySelector('.pinned')) {
        document.querySelector('.pinned').classList.remove('pinned');
      }
      newMessage.classList.add('pinned');
      Sender.pinMessage(msgObject.id);
    });

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
    const pinBtn = document.createElement('button');
    pinBtn.classList.add('pin-btn');
    pinBtn.innerHTML = 'Pin';

    if (msgObject.favorite) {
      btn.textContent = 'Not in favorite';
    } else {
      btn.textContent = 'In favorite';
    }

    if (msgObject.pinned) {
      newMessage.classList.add('pinned');
    }

    other.src = defaultImg;
    other.alt = text;
    other.classList.add('message-img');

    const a = document.createElement('a');
    const previeDiv = document.createElement('div');
    previeDiv.classList.add('preview-msg');
    a.innerHTML = text;
    a.href = link;
    a.download = text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      saveAttach(link, text);
    });
    previeDiv.append(other);
    previeDiv.append(a);

    newMessage.append(pinBtn);
    newMessage.append(previeDiv);
    newMessage.append(btn);

    pinBtn.addEventListener('click', () => {
      if (document.querySelector('.pinned')) {
        document.querySelector('.pinned').classList.remove('pinned');
      }
      newMessage.classList.add('pinned');
      Sender.pinMessage(msgObject.id);
    });

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
