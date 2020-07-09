import serviceUrl from '../constants/serviceUrl';
import getData from '../helper/fetchData';

async function getWords(jwt, userId, count) {
  const data = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/aggregatedWords?wordsPerPage=${count}filter=%7B%22%24or%22%3A%5B%7B%22userWord%22%3Anull%7D%5D%7D`,
    jwt,
  });
  return data;
}

export default {
  getWords,
};
