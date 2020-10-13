import React, { useState } from "react";

function MakeAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        required
        name="email"
        placeholder="jon@gmail.com"
        className="py-1 px-3 w-50"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" class="btn btn-success px-4 ml-2 mb-1">
        Submit
      </button>
    </form>
  );
}

export default MakeAdmin;
