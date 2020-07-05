import userServices from './user.services';

const { getData } = userServices;

const formStatistics = (game, level, wordObjs) => {
  const date = new Date().toLocaleDateString();
  const right = wordObjs.filter(({ status }) => status).length;
  const wrong = wordObjs.filter(({ status }) => !status).length;

  const stats = {
    g: game,
    d: date,
    l: level,
    r: right,
    w: wrong,
  };
  return stats;
};
const sendStatistics = async (stats) => {
  const { userId, JWT: jwt } = localStorage;
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
  const data = await getData({
    url,
    jwt,
  });
  if (data.code === 404) {
    const dataIfError = await getData({
      url,
      jwt,
      method: 'PUT',
      body: { learnedWords: 0, optional: { 0: stats } },
    });
    console.log(dataIfError);
    return;
  }
  // await getData({
  //   url,
  //   jwt,
  //   method: 'PUT',
  //   body: { optional: { 0: stats } },
  // });

  const { optional } = data;
  const lengthOfOptional = Object.keys(optional).length;
  if (lengthOfOptional < 20) {
    const sentStats = await getData({
      url,
      jwt,
      method: 'PUT',
      body: { optional: { ...optional, [lengthOfOptional]: stats } },
    });
    console.log('sentStats if length < 20', sentStats, 'length', lengthOfOptional);
    return;
  }
  if (lengthOfOptional >= 20) {
    const propToDelete = Object.keys(optional)[0];
    delete optional[propToDelete];
    const sentStats = await getData({
      url,
      jwt,
      method: 'PUT',
      body: { optional: { ...optional, [`${Number(propToDelete) + 20}`]: stats } },
    });
    console.log('sentstats if length >= 20', sentStats, 'length', lengthOfOptional);
  }
};
export default {
  formStatistics,
  sendStatistics,
};
