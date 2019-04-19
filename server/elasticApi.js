const axios = require('axios');

module.exports = (host, port) => {
  const api = axios.create({
    baseURL: `http://${host}:${port}`
  });

  // Capture the response error from ES API.
  return new Proxy(api, {
    get: (target, method) => async (...args) => {
      try {
        return await target[method](...args);
      } catch (err) {
        const object = new Error(err.response.statusText);
        object.response = err.response.data.error;
        throw object;
      }
    }
    });
};
