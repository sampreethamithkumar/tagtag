import React, { useState } from "react";
import { toast } from "react-toastify";
import postImage from "../../services/postImage";

const Home = () => {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    const result = postImage({ image: file });
    setImages([result.image, ...images]);
    result
      .then((result) => toast.success("Image Uploaded to S3"))
      .catch((e) => toast.error("Upload to S3 failed."));
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="home-page">
      <h1>Upload Image to S3</h1>
      <h3>Please attach an image</h3>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <label className="custom-file-upload">
          <input onChange={fileSelected} type="file" accept="image/*"></input>
          Attach Image
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
