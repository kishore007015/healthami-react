export const getViewInfo = JSON.parse(localStorage.getItem("view_info"));
let apiUrl = "http://162.0.222.125:8002";

function getHeaders(getUrl) {
  let getAuthToken = JSON.parse(localStorage.getItem("view_info"))?.oauthToken;
  var commonHeaders = {
    "Content-Type":  "application/json",
    "accept": "application/json"
  };
  if (getUrl && getUrl.indexOf("password/update") !== -1) {
    return commonHeaders;
  } else {
    return Object.assign(
      commonHeaders,
      getAuthToken ? { authorization: `Bearer ${getAuthToken}` } : null
    );
  }
}

export const postServiceCall = async (getUrl, getData) => {
  const options = {
    method: "POST",
    headers: getHeaders(getUrl),
    body: JSON.stringify(getData)
  };
  let url = apiUrl + getUrl; 
  return fetch(url, options).then((response) => {
    if (response.ok || response.status === 400) {
      return response.json();
    }
    throw response;
  }).then((response) => {
    let result = {};
    if (response && response) {
      result = response;
    }
    return result;
  }).catch((error) => {
    console.log("Error in Service Call");
  })
};

export const getServiceCall = async (getUrl) => {
  const options = {
    method: "GET",
    headers: getHeaders()
  };
  let url = apiUrl + getUrl; 
  return fetch(url, options).then((response) => {
    if (response.ok || response.status === 400) {
      return response.json();
    }
    throw response;
  }).then((response) => {
    let result = {};
    if (response && response) {
      result = response;
    }
    return result;
  }).catch((error) => {
    console.log("Error in Service Call");
  })
};

export const putServiceCall = async (getUrl, getData) => {
  const options = {
    method: "PUT",
    headers: getHeaders(getUrl),
    body: JSON.stringify(getData)
  };
  let url = apiUrl + getUrl; 
  return fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }).then((response) => {
    let result = {};
    if (response && response) {
      result = response;
    }
    return result;
  }).catch((error) => {
    console.log("Error in Service Call");
  })
};

