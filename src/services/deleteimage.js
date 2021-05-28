import axios from "axios";

const apiEndPoint =
  "https://vt1c6as3q8.execute-api.us-east-1.amazonaws.com/prod/tagtag";

const token = localStorage.getItem("accessToken");

export function deleteImage(url) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.delete(apiEndPoint + "?url=" + url, config);
}
