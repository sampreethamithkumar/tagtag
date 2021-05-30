import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { getSimilarImages } from "../../services/getSimilarImages";

const QuerySimilarImages = () => {
  const [files, setfiles] = useState([]);
  const [imageurl, setimageurl] = useState("");

  const getFiles = async (files) => {
    const base64Data = files[0].base64.split(",");
    setfiles(files);
    // console.log(base64Data[1]);
    try {
      const object = await getSimilarImages(base64Data[1]);
      console.log(object.data);
      setimageurl(object.data);
      // setimageurl(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="home-page">
      <h1>Similar Object Based on Image</h1>
      <h3>Please upload an image</h3>
      <div className="text-center">
        <label className="custom-file-upload">
          <FileBase64 multiple={true} onDone={getFiles} />
          Attach Image
        </label>
      </div>

      <div className="center">
        {files.map((file, i) => {
          return <img key={i} src={file.base64} />;
        })}
        <img src="" />
      </div>

      {imageurl !== "" && <div>{imageurl}</div>}
    </div>
  );
};

export default QuerySimilarImages;
