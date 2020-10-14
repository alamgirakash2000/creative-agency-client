import React, { useEffect } from "react";
import "./Login.style.css";
import { useLocation, useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../FirabaseConfig";
import logo from "../../images/logos/logo.png";
import Axios from "../../axios";

function Login({ user, setUser }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("volunteer-network-user")) || {});
    if (user.email) {
      history.replace(from);
    }
  }, []);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    await auth
      .signInWithPopup(provider)
      .then(function (result) {
        const newUser = result.user;
        localStorage.setItem(
          "volunteer-network-user",
          JSON.stringify({
            name: newUser.displayName,
            email: newUser.email,
            image: newUser.photoURL,
            id: newUser.uid,
          })
        );
        setUser({
          name: newUser.displayName,
          email: newUser.email,
          image: newUser.photoURL,
          id: newUser.uid,
        });

        Axios.get(`/api/admins/${newUser.email}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.length === 1) {
              history.push("/admin/servicelist");
            } else {
              history.replace(from);
            }
          })
          .catch((err) => alert(err.message));
      })
      .catch(function (error) {
        alert(error.message);
        return;
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="" />
      </div>
      <div className="login__body">
        <h3>Login With</h3>
        <button className="login__btn" onClick={loginWithGoogle}>
          <img
            src="https://img.icons8.com/color/452/google-logo.png"
            alt=""
            className="login__btnLogo"
          />
          <p className="m-auto">Continue with google</p>
        </button>
        <p>
          Don't have an account? <Link to="/login">Create an account</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
