import serviceUrl from '../constants/serviceUrl';

async function getData(params) {
  try {
    const response = await fetch(params.url, {
      method: params.method || 'GET',
      withCredentials: true,
      headers: {
        Authorization: params.jwt ? `Bearer ${params.jwt}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: params.body ? JSON.stringify(params.body) : null,
    });
    if (response.status !== 200) {
      const errorMessage = await response.text();
      console.error(`Ошибка: ${errorMessage}, Код: ${response.status}`);
      return { error: errorMessage };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Ошибка: ${e.message}`);
    return { error: 'Data request error' };
  }
}

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
