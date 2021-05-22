import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/search";

async function getImageURLByTag(tag1, tag2, tag3, tag4) {
  const params = {};
  if (tag1 !== "") params["tag1"] = tag1;
  if (tag2 !== "") params["tag2"] = tag2;
  if (tag3 !== "") params["tag3"] = tag3;
  if (tag4 !== "") params["tag4"] = tag4;

  return await axios.get(apiEndPoint, { params });
}

async function getImages() {
  return await axios.get(apiEndPoint);
}

export { getImageURLByTag, getImages };
