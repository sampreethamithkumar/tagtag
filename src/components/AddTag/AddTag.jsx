import React, { useState } from "react";
import { updateTag } from "../../services/addTag";

const AddTag = () => {
  const [url, seturl] = useState("");
  const [tag, setTag] = useState("");
  const [arrayTag, setArrayTag] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    setArrayTag(tag.split(";"));
    try {
      const response = await updateTag(url, arrayTag);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <h1>Add Tag to Image</h1>
      <form onSubmit={submit}>
        <div class="mb-3">
          <label for="url" class="form-label">
            URL
          </label>
          <input
            type="text"
            class="form-control"
            id="url"
            value={url}
            onChange={(event) => seturl(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="tags" class="form-label">
            Add Tag
          </label>
          <input
            type="text"
            class="form-control"
            id="tags"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddTag;
