const DataUrl = {
  LOAD: 'https://23.javascript.pages.academy/keksobooking/data',
  SEND: 'https://23.javascript.pages.academy/keksobooking',
};

const Method = {
  GET: 'Get',
  POST: 'Post',
};

const sendFetch = (url, request) => {
  const fetchResult = fetch(url, request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(`Не удалось загрузить данные с сервера. ${url} ${request.method}`);
      }
    });
  return fetchResult;
};

const getData = (onSuccess, onError) => {
  sendFetch(DataUrl.LOAD, {
    method: Method.Get,
  })
    .then((data) => onSuccess(data))
    .catch(() => {
      onError();
    });
};

const sendData = (body, onSuccess, onError) => {
  sendFetch(DataUrl.SEND, {
    method: Method.POST,
    body,
  })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
