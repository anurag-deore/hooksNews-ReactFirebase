import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import FirebaseContext from "../../firebase/context";
const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        type="text"
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        className={`inputSearch ${errors.description && "error-input"}`}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        type="url"
        onChange={handleChange}
        value={values.url}
        name="url"
        placeholder="The URL for the Link"
        autoComplete="off"
        className={`inputSearch mt3 ${errors.url && "error-input"}`}

      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="addBtn pa2 mt3" type="submit">
        Add Link
      </button>
    </form>
  );
}

export default CreateLink;
