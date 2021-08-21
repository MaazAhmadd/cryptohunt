import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer";
import Promote from "./components/promote";
import Newsletter from "./components/newsletter";
import Home from "./components/home";
import DetailsCoin from "./components/DetailsCoin";
import DetailsCoinSmall from "./components/DetailsCoinSmall";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Register from "./components/register";
import AddCoin from "./components/addcoin";
import AdminCoins from "./components/AdminCoins";
import Error from "./components/Error";
import Disclaimer from "./components/Disclaimer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import CoinIndex from "./components/CoinIndex";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  function doLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />

        <Route
          path="/coins/:id"
          exact
          children={
            window.innerWidth < 551 ? <DetailsCoinSmall /> : <DetailsCoin />
          }
        />

        <Route path="/logout" exact component={doLogout} />

        <Route path="/admin" exact component={AdminCoins} />

        <Route path="/login" exact component={Login} />

        <Route path="/register" exact component={Register} />

        <Route path="/add_coin" exact component={AddCoin} />

        <Route path="/promote" exact component={Promote} />

        <Route path="/newsletter" exact component={Newsletter} />

        <Route path="/disclaimer" exact component={Disclaimer} />

        <Route path="/privacy-policy" exact component={PrivacyPolicy} />

        <Route path="/terms-conditions" exact component={TermsConditions} />

        <Route path="/coins-index" exact component={CoinIndex} />

        <Route path="*" exact component={Error} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
