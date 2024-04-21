import Message from '../message';

export default class MsgListCreater {
  constructor() {
    this.startIndex = undefined;
    this.endIndex = undefined;
    this.chatWindow = undefined;
    this.newMsg = undefined;
    this.msgList = undefined;
    this.loadingMore = false;
    this.itemsPerPage = 10;
    this.listId = [];

    this.createList = this.createList.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  createList(msgList, parentElement) {
    // debugger
    this.msgList = msgList;
    if (!this.msgList || this.msgList.length === 0) return;

    if (this.listId.length > 0) {
      const maxDate = Math.max(...this.listId);
      this.msgList.filter((msg) => msg.date > maxDate);
      this.createFragment(0, msgList.length - 1, msgList);
      return;
    }

    if (!parentElement) {
      this.chatWindow = document.querySelector('.chat-window');
    } else {
      this.chatWindow = parentElement;
    }

    if (!this.startIndex || !this.loadingMore) {
      this.startIndex = 0;
    }

    this.endIndex = Math.min(this.msgList.length - 1, this.startIndex + this.itemsPerPage);

    this.createFragment(this.startIndex, this.endIndex, this.msgList);

    this.startIndex += this.itemsPerPage;
    this.chatWindow.addEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    if (this.chatWindow.children.length === this.msgList.length) {
      this.loadingMore = false;
      return;
    }

    if (this.chatWindow.scrollTop === 0) {
      this.loadingMore = true;
      this.createList(this.msgList);
    }
  }

  createFragment(startIndex, endIndex, msgList) {
    let lastChild;
    if (this.chatWindow) {
      Array.from(this.chatWindow.children).forEach((element) => {
        this.listId.push(Number(element.id));
      });
    }
    // debugger
    msgList.sort((a, b) => b.date - a.date);

    for (let i = startIndex; i <= endIndex; i++) {
      if (this.listId.includes(msgList[i].date)) continue;

      if (msgList[i].type === 'text') {
        this.newMessage = Message.newMessage(msgList[i]);
        this.newMessage.id = msgList[i].date;
      } else if (msgList[i].type === 'image') {
        this.newMessage = Message.newImgMessage(msgList[i]);
        this.newMessage.id = msgList[i].date;
      } else if (msgList[i].type === 'audio') {
        this.newMessage = Message.newAudioMessage(msgList[i]);
        this.newMessage.id = msgList[i].date;
      } else if (msgList[i].type === 'video') {
        this.newMessage = Message.newVideoMessage(msgList[i]);
        this.newMessage.id = msgList[i].date;
      } else {
        this.newMessage = Message.newOtherMessage(msgList[i]);
        this.newMessage.id = msgList[i].date;
      }
      // console.log(this.newMessage.id, listId[listId.length - 1])
      if (Number(this.newMessage.id) > this.listId[this.listId.length - 1] ? this.listId[this.listId.length - 1] : 0) {
        this.chatWindow.append(this.newMessage);
        lastChild = this.chatWindow.lastElementChild;
      } else {
        if (!lastChild) { lastChild = this.newMessage; }
        this.chatWindow.insertBefore(this.newMessage, this.chatWindow.firstChild);
      }
    }

    if (!lastChild) {
      this.chatWindow.lastChild.scrollIntoView();
    } else {
      lastChild.scrollIntoView();
    }
    this.newMessage = undefined;
  }
}
