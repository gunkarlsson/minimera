import { Link, NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import styled from "styled-components";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { BsPersonFill, BsInfoSquareFill } from "react-icons/bs";
import { ImBook } from "react-icons/im";

const Navbar = styled.nav`
  ul {
    z-index: 10;
    background-color: ${(props) => props.theme.bgColor1};
    min-height: 8vh;
    max-height: 8vh;
    bottom: 0;
    left: 0;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    list-style: none;
    padding: 5px;
    color: black;
  }
  li:active,
  li:focus {
    outline: none;
    background: none;
  }
  .nav-tab > * {
    color: ${(props) => props.theme.fontColor1};
    transition: all 0.3s ease;
  }
  .nav-tab-active > * {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Navigation = () => {
  return (
    <Navbar>
      <ul>
        <li>
          <NavLink
            to={ROUTES.HOME}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <AiFillHome size="2em" title="home" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.ADD_NEW_AD}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <AiFillPlusCircle size="2em" title="home" />
          </NavLink>
        </li>

        <li>
          <NavLink
            to={ROUTES.PROFILE}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <BsPersonFill size="2em" title="profile" />
          </NavLink>
        </li>

        <li>
          <NavLink
            to={ROUTES.ABOUT}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <BsInfoSquareFill size="1.8em" title="profile" />
          </NavLink>
        </li>
      </ul>
    </Navbar>
  );
};

export default Navigation;
