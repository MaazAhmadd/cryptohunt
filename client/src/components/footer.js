import React from "react";
import { Link } from "react-router-dom";

export default function footer() {
  return (
    <footer className="footer-main">
      <br />
      <div style={{ display: "block" }}>
        <ul>
          <li>
            <Link to="/disclaimer"> Disclaimer</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-conditions">Terms &amp; conditions</Link>
          </li>
          <li>
            <Link to="/coins-index">Coins Index</Link>
          </li>
        </ul>
      </div>
      <img src="" alt="" />
      <img src="" alt="" />
      <p>Cryptohunt © 2021 - contact@cryptohunt.com</p>
      <br />
    </footer>
  );
}
