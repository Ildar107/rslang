import serviceUrl from '../constants/serviceUrl';
import getData from '../helper/fetchData';

async function getWords(jwt, userId, count) {
  const data = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/aggregatedWords?wordsPerPage=${count}filter=%7B%22%24or%22%3A%5B%7B%22userWord%22%3Anull%7D%5D%7D`,
    jwt,
  });
  return data;
}
async function sendWords(jwt, userId, wordObject, optional) {
  const { _id: wordId, userWord } = wordObject;
  const sendData = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/words/${wordId}`,
    jwt,
    method: userWord ? 'PUT' : 'POST',
    body: { difficulty: 'string', optional },
  });
  return sendData;
}
async function getUserWords(jwt, userId) {
  const data = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/words`,
    jwt,
  });
  return data;
}

export default {
  getWords,
  sendWords,
  getUserWords,
};
