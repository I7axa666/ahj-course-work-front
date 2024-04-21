import fileImage from '../../img/file.png';

export default class PreviewAttach {
  static create(parentElement, file) {
    const lastChild = parentElement.lastElementChild;
    const preview = document.createElement('div');
    preview.classList.add('preview');

    const url = URL.createObjectURL(file);

    const fileType = file.type.substring(0, file.type.indexOf('/'));
    if (fileType === 'image') {
      const previewImg = document.createElement('img');
      previewImg.src = url;
      preview.appendChild(previewImg);
    } else if (fileType === 'video') {
      const previewVideo = document.createElement('video');
      previewVideo.src = url;
      previewVideo.controls = true;
      preview.appendChild(previewVideo);
    } else if (fileType === 'audio') {
      const previewAudio = document.createElement('audio');
      previewAudio.src = url;
      previewAudio.controls = true;
      preview.appendChild(previewAudio);
    } else {
      const previewImg = document.createElement('img');
      previewImg.src = fileImage;
      preview.appendChild(previewImg);
    }

    parentElement.insertBefore(preview, lastChild);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  }
}
