import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("volunteer-network-user")) || {});
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header user={user} setUser={setUser} />
          <Home />
        </Route>
        <PrivateRoute user={user} path="/customer/:pagename">
          <Customer user={user} />
        </PrivateRoute>
        <Route path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <PrivateRoute user={user} path="/admin/:pagename">
          <Admin user={user} />
        </PrivateRoute>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
