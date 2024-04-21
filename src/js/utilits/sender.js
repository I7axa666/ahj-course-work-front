import MsgListCreater from './createMsgList';

export default class Sender {
  constructor() {
    this.url = 'http://localhost:3000/';
    this.ws = new WebSocket('ws://localhost:3000/ws');
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
    // console.log(attach)
    // fetch(this.url + 'addfile/', {
    //   method: 'POST',
    //   body: body
    // })
    const body = JSON.stringify(attach);
    // console.log(body)
    this.ws.send(body);
  }

  sendTxt(text) {
    // fetch(this.url + 'addtext/', {
    //   method: 'POST',
    //   body: body
    // })

    const body = JSON.stringify({
      type: 'text',
      text,
    });
    this.ws.send(body);
  }

  // static showFavorite() {
  //   // console.log(attach)
  //   fetch(`${this.url}addfile/`, {
  //     method: 'POST',
  //     body,
  //   });
  // }

  static sendFavorite(id) {
    const body = JSON.stringify({
      id,
    });
    fetch('http://localhost:3000/', {
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
}
