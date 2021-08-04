import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/footer";
import Promote from "./components/promote";
import Home from "./components/home";
import DetailsCoin from "./components/DetailsCoin";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Register from "./components/register";
import AddCoin from "./components/addcoin";

function doLogout() {
  localStorage.setItem("logged_in", 0);
  localStorage.setItem("user_email", "");
  localStorage.setItem("is_admin", "");
  localStorage.setItem("registered", "");
  localStorage.setItem("name", "");

  window.location.href = "/login";
}

function App() {
  return (
    <Router>
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

      <Footer />
    </Router>
  );
}

export default App;
