import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/update";

const token = localStorage.getItem("accessToken");

function updateTag(url, tag) {
  const params = {
    url,
    tags: tag,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params,
  };
  return axios.post(apiEndPoint, config);
}

export { updateTag };
