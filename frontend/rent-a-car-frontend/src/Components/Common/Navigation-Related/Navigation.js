import React from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBFormInline,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";

const Navigationbar = props => {
  return (
    <MDBNavbar color={"blue"} expand={"lg"} dark={true}>
      <MDBNavbarBrand>Rent A Car</MDBNavbarBrand>
      <MDBNavbarNav left={true}>{props.navItems}</MDBNavbarNav>
      <MDBNavbarNav right={true}>
        <MDBNavItem avatar ml-auto nav-flex-icons>
          <MDBNavLink to='/myProfile'>
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
              class="rounded-circle z-depth-0"
              alt="avatar image"
              height="35"
            />
          </MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>

    // <nav class="navbar navbar-expand-lg navbar-dark primary-color">

    //   <a class="navbar-brand" href="#">Navbar</a>

    //   <ul class="navbar-nav">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="#">Home

    //         </a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Features</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Pricing</a>
    //       </li>

    //       <li class="nav-item dropdown">
    //         <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
    //           aria-haspopup="true" aria-expanded="false">Dropdown</a>
    //         <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
    //           <a class="dropdown-item" href="#">Action</a>
    //           <a class="dropdown-item" href="#">Another action</a>
    //           <a class="dropdown-item" href="#">Something else here</a>
    //         </div>
    //       </li>

    //     </ul>

    // </nav>

    // <div className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <a className="navbar-brand" href="#">
    //     Rent-A-Car
    //   </a>
    //   <div className="nav-element-search">
    //     <form className="form-inline">
    //       <input
    //       className="form-control mr-sm-2"
    //         type="search"
    //         placeholder="Search Cars"
    //         aria-label="Search"
    //       />
    //       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
    //         Search
    //       </button>
    //     </form>
    //   </div>
    //   {(
    //     <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
    //       <ul className='navbar-nav'>
    //         <li className={`navbar-nav ${this.props.dashboard}`}>
    //           <Link className="nav-link" to="/company_dashboard">
    //             Vehicles
    //           </Link>
    //         </li>
    //         <li className={`navbar-nav ${this.props.events}`}>
    //           <Link className="nav-link" to="/company_events">
    //             Parking Lots
    //           </Link>
    //         </li>
    //         <li className={`navbar-nav ${this.props.students}`}>
    //           <Link className="nav-link" to="/students">
    //             Reservations
    //           </Link>
    //         </li>
    //         <li className={`navbar-nav ${this.props.profile}`}>
    //           <Link className="nav-link" to={`/company_profile/`}>
    //             <div className="glyphicon glyphicon-log-in"></div> User
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
};

export default Navigationbar;
