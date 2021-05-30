import axios from "axios";

const token = localStorage.getItem("accessToken");

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post(
    "https://vt1c6as3q8.execute-api.us-east-1.amazonaws.com/prod/uploadimagetos3/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

export default postImage;
