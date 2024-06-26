import MsgListCreater from './createMsgList';

export default class Sender {
  constructor() {
    // this.url = 'http://localhost:3000/';
    this.url = 'https://ahj-course-work-back.onrender.com/';
    // this.ws = new WebSocket('ws://localhost:3000/ws');
    this.ws = new WebSocket('wss://ahj-course-work-back.onrender.com/ws');
    this.msgListCreater = new MsgListCreater();
    this.webSocketInit();
  }

  webSocketInit() {
    document.querySelector('.chat-window').innerHTML = '';
    this.ws.addEventListener('message', (e) => {
      // console.log(JSON.parse(e.data));

      this.msgListCreater.createList(JSON.parse(e.data));
    });
    this.ws.addEventListener('close', () => {
      alert('Соединение потеряно. Попробуйте перезагрузить страницу');
    });
  }

  sendAttach(attach) {
    const body = JSON.stringify(attach);

    this.ws.send(body);
  }

  sendTxt(text) {
    const body = JSON.stringify({
      type: 'text',
      text,
    });
    this.ws.send(body);
  }

  static sendFavorite(id) {
    const body = JSON.stringify({
      id,
    });

    // fetch('http://localhost:3000/', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body,
    // });

    fetch('https://ahj-course-work-back.onrender.com/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  getFavorite() {
    return fetch(this.url, {
      method: 'GET',
    });
  }

  static pinMessage(id) {
    const body = JSON.stringify({
      id,
    });

    // fetch('http://localhost:3000/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body,
    // });

    fetch('https://ahj-course-work-back.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }
}
