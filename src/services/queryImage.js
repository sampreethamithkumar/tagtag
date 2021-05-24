import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/search";

const token = localStorage.getItem("accessToken");

function getImageURLByTag(tag1, tag2, tag3, tag4) {
  const params = {};
  if (tag1 !== "") params["tag1"] = tag1;
  if (tag2 !== "") params["tag2"] = tag2;
  if (tag3 !== "") params["tag3"] = tag3;
  if (tag4 !== "") params["tag4"] = tag4;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params,
  };

  return axios.get(apiEndPoint, config);
}

function getImages() {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(apiEndPoint, config);
}

export { getImageURLByTag, getImages };
