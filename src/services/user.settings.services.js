import serviceUrl from '../constants/serviceUrl';
import getData from '../helper/fetchData';

async function setUserSettings(jwt, userId, settingObj) {
  const data = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/settings`,
    jwt,
    method: 'PUT',
    body: {
      wordsPerDay: settingObj.wordsPerDay,
      optional: {
        cardsPerDay: settingObj.cardsPerDay,
        translate: settingObj.translate,
        explain: settingObj.explain,
        example: settingObj.example,
        transcription: settingObj.transcription,
        wordImg: settingObj.wordImg,
        showAnswer: settingObj.showAnswer,
        showDelete: settingObj.showDelete,
        showHard: settingObj.showHard,
      },
    },
  });
  return data;
}

async function getUserSettings(jwt, userId) {
  const data = await getData({ url: `${serviceUrl.RESTSERVICEURL}/users/${userId}/settings`, jwt });
  if (!data.error) {
    return { wordsPerDay: data.wordsPerDay, ...data.optional };
  }
  return data;
}

export default { setUserSettings, getUserSettings };
