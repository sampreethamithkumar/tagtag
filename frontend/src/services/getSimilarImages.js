import axios from "axios";

const apiEndPoint =
  "https://vt1c6as3q8.execute-api.us-east-1.amazonaws.com/prod/tagtag/search";

const token = localStorage.getItem("accessToken");

export async function getSimilarImages(image) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.post(apiEndPoint, { imageBody: image }, config);
}
