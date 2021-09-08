import "../App.css";
import Burger from "./Burger";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 0;
  }
`;

function Navbar() {
  return (
    <Nav>
      <div className="nav_outer">
        <div className="header_logo_outer">
          <h3 className="header_logo_inner">
            <Link to="/">CryptoHunt</Link>
          </h3>
        </div>
        <Burger />
      </div>
    </Nav>
  );
}

export default Navbar;
