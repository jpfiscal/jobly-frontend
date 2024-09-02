import React, {useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";
import userContext from "./userContext";

function NavBar({logout}) {
    const currentUser = useContext(userContext);
    const navigate = useNavigate();
    const handleLogout = () =>{
        logout();
        navigate("/");
    }
    if (currentUser){
        return (
            <div className="NavBar">
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">
                        Jobly 
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <button onClick={handleLogout} className="nav-link">
                                Log Out
                            </button>
                            {/* <NavLink to="#" onClick={handleLogout}>Log Out</NavLink> */}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    } else {
        return (
            <div className="NavBar">
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">
                        Jobly 
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    
}

export default NavBar;