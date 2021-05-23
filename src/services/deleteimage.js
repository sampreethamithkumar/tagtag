import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag";

export function deleteImage(url) {
  return axios.delete(apiEndPoint + "?url=" + url);
}
