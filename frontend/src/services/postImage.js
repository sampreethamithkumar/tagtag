import axios from "axios";

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post("http://localhost:3001/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export default postImage;
