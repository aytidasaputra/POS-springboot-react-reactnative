const axios = require("axios");
const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

instanceAxios.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code !== 0) {
      const error = new Error(data.message || "Uknown error.");
      error.data = data.data;
      throw error;
    }
    return sleep(100, data.data);
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { instanceAxios };
