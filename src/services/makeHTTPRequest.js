import axios from "axios";

const BASE_URL = "https://shrinkly.onrender.com/" ;
const localhost = "http://localhost:5000/shrink.er/"

const makeRequest = (method, url, data) => {
  const user = localStorage.getItem("user");
  const userCredentials = JSON.parse(user);
  console.log(userCredentials?.token);
  const token = userCredentials?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers,
  });
};

export const getRequest = async ({ queryKey }) => {
  const [_, url] = queryKey;
  const response = await makeRequest("GET", url);
  return response.data;
};

export const postRequest = (params) => {
  const { url, body } = params;
  const data = body;
  return makeRequest("POST", url, data);
};

export const patchRequest = (params) => {
  const { previous_shorten_link, body } = params;
  const url = previous_shorten_link;
  const data = body;
  return makeRequest("PATCH", url, data);
};

export const deleteRequest = (url) => {
  return makeRequest("DELETE", url);
};
