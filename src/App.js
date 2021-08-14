import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer";
import Promote from "./components/promote";
import Newsletter from "./components/newsletter";
import Home from "./components/home";
import DetailsCoin from "./components/DetailsCoin";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Register from "./components/register";
import AddCoin from "./components/addcoin";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import config from "./config.json";
const currentUrl = config.CURRENT_URL;

function App() {
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  function doLogout() {
    localStorage.removeItem("token");
    window.location.href = currentUrl + "/login";
  }
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>

      <Switch>
        <Route path="/coins/:id" exact component={DetailsCoin} />
      </Switch>

      <Switch>
        <Route path="/logout" exact component={doLogout} />
      </Switch>

      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>

      <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>

      <Switch>
        <Route path="/add_coin" exact component={AddCoin} />
      </Switch>

      <Switch>
        <Route path="/promote" exact component={Promote} />
      </Switch>

      <Switch>
        <Route path="/newsletter" exact component={Newsletter} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
