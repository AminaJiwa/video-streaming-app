import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { Link, LinkProps  } from "react-router-dom";
import { ReplyLogo } from "../pages/ReplyLogo";
import "./Navbar.css";

interface NavbarComponentProps extends LinkProps {
  toPayments: string;
  toAdmin: string;
  toUser: string;
  toHome: string;
}

const NavbarComponent: React.FC<NavbarComponentProps>= ({
  children, // Include the children prop
  toPayments,
  toAdmin,
  toUser,
  toHome,
  ...otherProps
}) => {
    return(
        <Navbar className='navbar' aria-label="Navigation">
        <NavbarBrand >
          <ReplyLogo />
        </NavbarBrand>
        <NavbarContent>
        <NavbarItem className="navbar-item">
            <Link className="nav-link" to={toPayments}>
              Payments
            </Link>
          </NavbarItem>
          <NavbarItem className="navbar-item">
            <Link className="nav-link" to={toAdmin}>
              Admin
            </Link>
          </NavbarItem>
          <NavbarItem className="navbar-item">
            <Link className="nav-link" color="foreground" to={toUser}>
              User
            </Link>
          </NavbarItem>
          <NavbarItem className="navbar-item">
            <Link className="nav-link" color="foreground" to={toHome}>
              Home
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
  
    );
};

export default NavbarComponent;