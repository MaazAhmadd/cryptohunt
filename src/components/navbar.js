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
      <div className="header_logo_outer">
        <h3 className="header_logo_inner">
          <Link to="/">CryptoHunt</Link>
        </h3>
      </div>
      <Burger />
    </Nav>
  );
  // (
  //   <>
  //     <div className="nav_outer">
  //       <div className="header_logo_outer">
  //         <h3 className="header_logo_inner">
  //           <Link to="/">CryptoHunt</Link>
  //         </h3>
  //       </div>

  //       <div className="header_navbar_right_outer">
  //         <ul className="header_navbar_right_inner">
  //           <li className="header_item">
  //             <Link to="/add_coin" className="header_link">
  //               Add Coin
  //             </Link>
  //           </li>
  //           <li className="header_item">
  //             <Link to="/promote" className="header_link">
  //               Promote
  //             </Link>
  //           </li>
  //           <li className="header_item">
  //             <Link to="/newsletter" className="header_link">
  //               Newsletter
  //             </Link>
  //           </li>
  //           <li className="header_item">
  //             {is_user_logged_in ? (
  //               <Link to="/login" className="header_link">
  //                 Sign In
  //               </Link>
  //             ) : (
  //               <Link to="/logout" className="header_link">
  //                 Sign Out
  //               </Link>
  //             )}
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Navbar;
