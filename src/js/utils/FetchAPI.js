import fetch from "unfetch";


const fetchData = (LINK, DATA, CALLBACK) => {

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

    fetch(LINK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(DATA)
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(data => CALLBACK(data))
        .catch(error => CALLBACK(error));
};


export default fetchData;