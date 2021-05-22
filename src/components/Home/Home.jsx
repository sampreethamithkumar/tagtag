import React, { useState } from "react";
import postImage from "../../services/postImage";

const Home = () => {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="home-page">
      <h1>Object Detection in Image</h1>
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
