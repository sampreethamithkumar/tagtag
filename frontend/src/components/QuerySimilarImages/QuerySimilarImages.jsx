import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { getSimilarImages } from "../../services/getSimilarImages";

const QuerySimilarImages = () => {
  const [files, setfiles] = useState([]);
  const [base64URL, setbase64URL] = useState("");
  const [objects, setobjects] = useState(undefined);

  const imageAttached = async () => {
    try {
      const objects = await getSimilarImages(base64URL);
      setobjects(objects);
    } catch (ex) {
      console.log("Exception Occured:", ex);
    }
  };

  const getFiles = (files) => {
    const base64Data = files[0].base64.split(",");
    setfiles(files);
    setbase64URL(base64Data[1]);
    imageAttached();
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
      {base64URL !== "" && objects === undefined ? <p>Loading...</p> : null}

      <div className="center">
        {files.map((file, i) => {
          return <img key={i} src={file.base64} />;
        })}
        <img src="" />
      </div>

      {objects !== undefined && objects.data.object !== null ? (
        <div className="pre-container1">
          <ul>
            {objects.data.object.map((object) => (
              <li>
                Detected: {object.label} | Accuracy {object.accuracy}
              </li>
            ))}{" "}
          </ul>
        </div>
      ) : null}

      {objects !== undefined && objects.data.object === null ? (
        <div>
          <p>No Objects Detected, Please try another image.</p>
        </div>
      ) : null}
    </div>
  );
};

export default QuerySimilarImages;
