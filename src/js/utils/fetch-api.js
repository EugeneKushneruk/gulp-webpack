import fetch from "unfetch";


const fetchData = (LINK, DATA=null, CALLBACK) => {
  const options = DATA == null
    ? { method: "GET" }
    : { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(DATA) };

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    else {
      return Promise.reject({
        code: response.status,
        message: response.statusText
      });
    }
  }

  fetch(LINK, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => CALLBACK(data))
    .catch(error => CALLBACK(error));
};


export default fetchData;
