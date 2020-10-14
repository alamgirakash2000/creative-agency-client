import React, { useEffect, useState } from "react";
import "./ServiceList.style.css";
import axios from "../../axios";

function ServiceList({ user }) {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/orders/${user.email}`)
      .then((response) => {
        setMyOrders(response.data);
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className="orders row my-5">
      {myOrders.map((order) => (
        <div key={order._id} className="col-lg-4 col-md-6 my-3">
          <div className="order">
            <div className="top d-flex justify-content-between">
              <img src={order.image} alt="" className="order__img" />
              <div className={`order__status ${order.status}`}>
                <p className="mb-2">{order.status}</p>
              </div>
            </div>
            <div className="bottom">
              <h5>{order.service.title}</h5>
              <p>{order.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
