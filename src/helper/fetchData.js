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
      return ({ error: errorMessage });
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Ошибка: ${e.message}`);
    return { error: 'Data request error' };
  }
}

export default getData;
