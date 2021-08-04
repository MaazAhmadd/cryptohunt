import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    height: 100%;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  const is_user_logged_in =
    localStorage.getItem("logged_in") == 1 ? false : true;

  return (
    <div className="header_navbar_right_outer">
      <Ul open={open} className="header_navbar_right_inner">
        <li className="header_item">
          <Link to="/add_coin" className="header_link">
            Add Coin
          </Link>
        </li>
        <li className="header_item">
          <Link to="/promote" className="header_link">
            Promote
          </Link>
        </li>
        <li className="header_item">
          <Link to="/newsletter" className="header_link">
            Newsletter
          </Link>
        </li>
        <li className="header_item">
          {is_user_logged_in ? (
            <Link to="/login" className="header_link">
              Sign In
            </Link>
          ) : (
            <Link to="/logout" className="header_link">
              Sign Out
            </Link>
          )}
        </li>
      </Ul>
    </div>
  );
};

export default RightNav;
