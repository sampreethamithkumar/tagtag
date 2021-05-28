import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteImage } from "../../services/deleteimage";

const DeleteImage = () => {
  const [url, seturl] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    try {
      await deleteImage(url);
      toast.success("Image Deleted");
    } catch (e) {
      toast.error("Unexpected Error occured deleting an image");
    }
  };

  return (
    <React.Fragment>
      <h1>Delete Image</h1>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            onChange={(event) => seturl(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default DeleteImage;
