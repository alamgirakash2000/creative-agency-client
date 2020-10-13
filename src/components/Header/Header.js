import { auth } from "firebase";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logos/logo.png";

function Header({ user, setUser }) {
  const [bg, setBg] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 47) {
        setBg(true);
      } else {
        setBg(false);
      }
    });
    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser({});
        localStorage.removeItem("volunteer-network-user");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={`position-fixed sticky-top w-100 ${bg && "bg-light"} `}>
      <nav className="container navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" className="header__logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              exact
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              to="/user"
            >
              Our Portfolio
            </NavLink>
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              to="/admin"
            >
              Our Team
            </NavLink>

            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              to="/t"
            >
              Contact us
            </NavLink>

            {user.email ? (
              <button className="btn btn-danger ml-3" onClick={logout}>
                LOGOUT
              </button>
            ) : (
              <NavLink
                className="nav-link btn btn-dark ml-3 px-3 text-light"
                to="/login"
              >
                LOGIN
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
