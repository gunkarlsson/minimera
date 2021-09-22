import { NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Navbar } from "../style/StyledComponents";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { BsPersonFill, BsInfoSquareFill } from "react-icons/bs";

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
            to={ROUTES.CREATE_AD}
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
