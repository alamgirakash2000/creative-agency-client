import React, { useEffect, useState } from "react";
import "./Review.style.css";

function Review({ user }) {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let order = {
      username: user.name,
      company: companyName,
      description: description,
    };
    console.log(order);
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
