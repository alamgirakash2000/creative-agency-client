import React from "react";
import logo from "../../images/logos/logo.png";
import { useParams, NavLink, Link } from "react-router-dom";
import AddService from "../AddService/AddService";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import AdminServiceList from "../AdminServiceList/AdminServiceList";
import { Avatar } from "@material-ui/core";

function Admin({ user }) {
  const pagename = useParams().pagename;
  return (
    <div className="admin">
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
              <li className="my-3">
                <NavLink
                  className={` my-3 ${
                    pagename === "servicelist" ? "text-success" : "text-dark"
                  }`}
                  to="/admin/servicelist"
                >
                  <i class="fas fa-suitcase-rolling"></i> Service List
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  className={` my-3 ${
                    pagename === "addservice" ? "text-success" : "text-dark"
                  }`}
                  to="/admin/addservice"
                >
                  <i class="fas fa-plus"></i> Add service
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  className={` my-3 ${
                    pagename === "makeadmin" ? "text-success" : "text-dark"
                  } `}
                  to="/admin/makeadmin"
                >
                  <i className="fas fa-user-plus"></i> Make Admin
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-10 col-9 customer__right py-4">
            {pagename === "servicelist" && <AdminServiceList user={user} />}
            {pagename === "addservice" && <AddService user={user} />}
            {pagename === "makeadmin" && <MakeAdmin user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
