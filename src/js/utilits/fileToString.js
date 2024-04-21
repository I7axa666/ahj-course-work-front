export default function fileToString(file, callback) {
  console.log(file);
  const reader = new FileReader();

  reader.onload = function (event) {
    const fileData = event.target.result;
    console.log(fileData);
    callback(fileData);
  };

  reader.onerror = function (event) {
    console.error('Ошибка чтения файла:', event.target.error);
  };

  reader.readAsDataURL(file);
}
