import React from "react";
import "./Customer.style.css";
import logo from "../../images/logos/logo.png";
import { useParams, NavLink, Link } from "react-router-dom";
import Order from "../Order/Order";
import Review from "../Review/Review";
import ServiceList from "../ServiceList/ServiceList";
import { Avatar } from "@material-ui/core";

function Customer({ user }) {
  const pagename = useParams().pagename;
  return (
    <div className="customer">
      <div className="header py-4">
        <div className="row">
          <div className="col-3 ">
            <Link to="/">
              <img src={logo} style={{ height: "50px" }} alt="" />
            </Link>
          </div>
          <div className="col-md-9 d-flex justify-content-between align-items-center pr-4">
            <h4 style={{ textTransform: "capitalize" }}>{pagename}</h4>
            <p className="ml-auto mr-2">{user.name}</p>
            <Avatar alt={user.name} src={user.image} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-3 customer__sidebar">
            <ul className="ml-md-3">
              <li className="my-2">
                <NavLink
                  className={` ${
                    pagename === "order" ? "text-success" : "text-light"
                  }`}
                  to="/customer/order"
                >
                  <i className="fas fa-shopping-cart"></i> Order
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  className={` my-3 ${
                    pagename === "servicelist" ? "text-success" : "text-light"
                  }`}
                  to="/customer/servicelist"
                >
                  {" "}
                  <i className="fas fa-suitcase-rolling"></i> Service List
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  className={` my-3 ${
                    pagename === "review" ? "text-success" : "text-light"
                  } `}
                  to="/customer/review"
                >
                  <i className="fas fa-comment"></i> Review
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-10 col-9 customer__right">
            {pagename === "order" && <Order user={user} />}
            {pagename === "servicelist" && <ServiceList user={user} />}
            {pagename === "review" && <Review user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
