import axios from "axios";

const apiEndPoint =
  "https://dc7wcopoi1.execute-api.us-east-1.amazonaws.com/prod/tagtag/update";

const token = localStorage.getItem("accessToken");
console.log('Token in add tag: ' + token);
function updateTag(url, tag) {
  
  const params = {
    url,
    tags: tag,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}`
  }
};
console.log('Tags ' + typeof(tag));
  return axios.post(apiEndPoint, params,config);
}

export { updateTag };
