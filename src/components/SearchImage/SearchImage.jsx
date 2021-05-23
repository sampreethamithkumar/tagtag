import React, { useState } from "react";
import { getImages, getImageURLByTag } from "../../services/queryImage";

const SearchImage = () => {
  const [param1, setparam1] = useState("");
  const [param2, setparam2] = useState("");
  const [param3, setparam3] = useState("");
  const [param4, setparam4] = useState("");
  const [url, setUrl] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    let response;
    if (param1 === "" && param2 === "" && param3 === "" && param4 == "")
      response = await getImages();
    else response = await getImageURLByTag(param1, param2, param3, param4);

    const { data } = response;
    setUrl(data.split(","));
    console.log(url);
    setIsSubmitted(true);
  };

  return (
    <React.Fragment>
      <h1>Find Image By Tag</h1>
      <form onSubmit={submit}>
        <div class="mb-3">
          <label for="param1" class="form-label">
            Parameter 1
          </label>
          <input
            type="text"
            class="form-control"
            id="param1"
            value={param1}
            onChange={(event) => setparam1(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="param2" class="form-label">
            Parameter 2
          </label>
          <input
            type="text"
            class="form-control"
            id="param2"
            value={param2}
            onChange={(event) => setparam2(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="param3" class="form-label">
            Parameter 3
          </label>
          <input
            type="text"
            class="form-control"
            id="param3"
            value={param3}
            onChange={(event) => setparam3(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="param4" class="form-label">
            Parameter 4
          </label>
          <input
            type="text"
            class="form-control"
            id="param4"
            value={param4}
            onChange={(event) => setparam4(event.target.value)}
          />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {isSubmitted && (
        <div>
          <h4>Image Urls</h4>
          <ul>
            {url.map((data) => (
              <li key={data}>{data}</li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchImage;
