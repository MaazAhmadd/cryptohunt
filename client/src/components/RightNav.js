import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

let token = localStorage.getItem("token");
let dectoken = { role: "notAdmin" };

try {
  dectoken = jwtDecode(token);
} catch (ex) {}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 110%;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 1000000;

    li {
      text-align: center;
      font-weight: 700;
      font-size: 1.5rem;
      padding-top: 0.7rem;
      color: #fff;
    }
  }
`;

const RightNav = ({ open, setOpen }) => {
  const is_user_logged_in = localStorage.getItem("token") ? false : true;

  return (
    <div className="header_navbar_right_outer">
      <Ul open={open} className="header_navbar_right_inner">
        {dectoken.role == "admin" ? (
          <li className="header_item">
            <Link
              to="/admin"
              className="header_link"
              onClick={() => setOpen(!open)}
            >
              Admin
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="header_item">
          <Link
            to="/add_coin"
            className="header_link"
            onClick={() => setOpen(!open)}
          >
            Add Coin
          </Link>
        </li>
        <li className="header_item">
          <Link
            to="/promote"
            className="header_link"
            onClick={() => setOpen(!open)}
          >
            Promote
          </Link>
        </li>
        <li className="header_item">
          <Link
            to="/newsletter"
            className="header_link"
            onClick={() => setOpen(!open)}
          >
            Newsletter
          </Link>
        </li>
        <li className="header_item">
          {is_user_logged_in ? (
            <Link
              to="/login"
              className="header_link"
              onClick={() => setOpen(!open)}
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/logout"
              className="header_link"
              onClick={() => setOpen(!open)}
            >
              Sign Out
            </Link>
          )}
        </li>
      </Ul>
    </div>
  );
};

export default RightNav;
