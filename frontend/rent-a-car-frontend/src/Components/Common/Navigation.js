import React from "react";
import { Link } from "react-router-dom";

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Rent-A-Car
        </a>
        <div className="nav-element-search">
          <form className="form-inline">
            <input
            className="form-control mr-sm-2"
              type="search"
              placeholder="Search Cars"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
        {(
          <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
            <ul className='navbar-nav'>
              <li className={`navbar-nav ${this.props.dashboard}`}>
                <Link className="nav-link" to="/company_dashboard">
                  Vehicles
                </Link>
              </li>
              <li className={`navbar-nav ${this.props.events}`}>
                <Link className="nav-link" to="/company_events">
                  Parking Lots
                </Link>
              </li>
              <li className={`navbar-nav ${this.props.students}`}>
                <Link className="nav-link" to="/students">
                  Reservations
                </Link>
              </li>
              <li className={`navbar-nav ${this.props.profile}`}>
                <Link className="nav-link" to={`/company_profile/`}>
                  <div className="glyphicon glyphicon-log-in"></div> User
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Navigationbar;
