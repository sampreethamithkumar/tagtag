import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/update";

function updateTag(url, tag) {
  return axios.post(apiEndPoint, { url, tags: tag });
}

export { updateTag };
