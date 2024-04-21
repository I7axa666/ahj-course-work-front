// import Message from "../message";
import MsgListCreater from '../utilits/createMsgList';

export default class FavoriteWindow {
  static show(sender) {
    sender.getFavorite()
      .then((res) => res.json())
      .then((res) => {
        const favoriteList = document.createElement('div');
        favoriteList.classList.add('favorite-list');

        document.querySelector('.organizer').append(favoriteList);
        favoriteList.innerHTML = '';
        const msgListCreater = new MsgListCreater();

        msgListCreater.createList(res, favoriteList);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = 'Close';

        favoriteList.append(closeBtn);

        closeBtn.addEventListener('click', () => {
          favoriteList.remove();
        });
      });
  }
}
