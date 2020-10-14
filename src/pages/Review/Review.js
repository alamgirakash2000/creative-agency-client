import React, { useState } from "react";
import "./Review.style.css";
import Axios from "../../axios";
import { useHistory } from "react-router-dom";

function Review({ user }) {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let review = {
      username: user.name,
      image: user.image,
      company: companyName,
      description: description,
    };

    await Axios.post("/api/reviews/", review)
      .then((response) => {
        alert(response.data);
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <form onSubmit={handleSubmit} className="addOrder__form">
      <input
        type="text"
        className="form-control"
        placeholder="Your name"
        value={user.name}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Company's name, Designation"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <textarea
        required
        rows="5"
        type="text"
        value={description}
        className="form-control"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn btn-dark px-5 mx-2 my-3">
        SUBMIT
      </button>
    </form>
  );
}
export default Review;
