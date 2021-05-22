import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/delete";

export function deleteImage(url) {
  return axios.delete(apiEndPoint + "?url=" + url);
}
