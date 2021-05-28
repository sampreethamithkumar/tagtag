import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateTag } from "../../services/addTag";

const AddTag = () => {
  const [url, seturl] = useState("");
  const [tag, setTag] = useState("");
  const [arrayTag, setArrayTag] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    setArrayTag(tag.split(";"));
    updateTag(url, arrayTag)
      .then(() => toast.success("Tag Added"))
      .catch((e) => toast.error(e));
  };

  return (
    <React.Fragment>
      <h1>Add Tag to Image</h1>
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
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Add Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddTag;
