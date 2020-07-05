import serviceUrl from '../constants/serviceUrl';
import getData from '../helper/fetchData';

async function getUser(jwt, userId) {
  const data = await getData({ url: `${serviceUrl.RESTSERVICEURL}/users/${userId}`, jwt });
  return data;
}

async function createUser(email, password) {
  const user = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/users`,
    method: 'POST',
    body: { email, password },
  });

  return user;
}

async function signIn(email, password) {
  const data = await getData({
    url: `${serviceUrl.RESTSERVICEURL}/signin`,
    method: 'POST',
    body: { email, password },
  });
  return data;
}

export default {
  getUser, createUser, signIn, getData,
};
