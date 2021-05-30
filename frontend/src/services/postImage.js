import axios from "axios";

const token = localStorage.getItem("accessToken");

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = "";
  try {
    result = await axios.post(
      "https://vt1c6as3q8.execute-api.us-east-1.amazonaws.com/prod/uploadimagetos3/images",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          boundary: `${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  return result.data;
}

export default postImage;
