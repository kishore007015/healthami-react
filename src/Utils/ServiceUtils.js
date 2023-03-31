export const getToken = JSON.parse(localStorage.getItem("token"));
let apiUrl = "http://162.0.222.125:8002";

export const serviceCall = async (method, getUrl, getData) => {
  let commonHeaders = {
    "Content-Type": "application/json",
    "accept": "application/json",
    ...(getToken ? { "authorization": `Bearer ${getToken}` } : "")
  };
  const options = {
    method: method,
    headers: commonHeaders,
    ...(method !== "GET" ? { "body": JSON.stringify(getData) } : "")
  };
  let url = apiUrl + getUrl;
  return fetch(url, options).then((response) => {
    if (response.ok || response.status === 400) {
      return response.json();
    }
    throw response;
  }).then((response) => {
    return response;
  }).catch((error) => {
    console.log("Error in Service Call");
  })
};
