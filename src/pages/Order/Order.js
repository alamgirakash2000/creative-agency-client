import React, { useEffect, useState } from "react";
import "./Order.style.css";
import { useLocation } from "react-router-dom";
import Axios from "../../axios";

function Order({ user }) {
  const [service, setService] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState({});
  const params = useLocation().search;
  const serviceId = params.slice(1);

  useEffect(() => {
    Axios.get(`/api/categories/${serviceId}`)
      .then((response) => {
        let { name, description, img } = response.data;
        setService({ name, description, img });
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let order = {
      username: user.name,
      email: user.email,
      service: service,
      description: description,
      status: "pending",
      price: price,
    };
    console.log(order);
  };

  return (
    <form onSubmit={handleSubmit} className="addOrder__form">
      <input
        type="text"
        className="form-control"
        placeholder="Your name/Company's name"
        value={user.name}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Your email address"
        value={user.email}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Service Name"
        value={service.name}
      />

      <textarea
        rows="5"
        type="text"
        className="form-control"
        placeholder="Project details"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        className="form-control"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn btn-dark my-3">
        SUBMIT
      </button>
    </form>
  );
}

export default Order;
