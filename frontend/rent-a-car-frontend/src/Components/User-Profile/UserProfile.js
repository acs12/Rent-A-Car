import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import { connect } from "react-redux";
import "../../styles/profile.styles.css";
import { fetchUser } from "../../redux/actions/fetchAction";
import { updateUser } from "../../redux/actions/setAction";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldEdit: false };
    this.onEditClick = this.onEditClick.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.props.fetchUser(localStorage.getItem("id"), result => {
      console.log(result);
    });
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onEditClick(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        ...prevState,
        shouldEdit: !prevState.shouldEdit
      };
    });
  }

  onSubmitClick(e) {
    e.preventDefault();
    let formData = {userId: localStorage.getItem("id")};
    if (e.target.name === "extend-card") {
      formData = { ...formData, extendCard: true };
    } else {
      formData = { ...formData, ...this.state };
    }
    if (this.state.shouldEdit){
      this.props.updateUser(formData, result => {
        this.onEditClick(e);
      });
    }
  }

  render() {
    let tempItems = [
      {
        name: "Vehicles",
        to: "/dashboard",
        active: false
      },
      {
        name: "Rental Locations",
        to: "/locations",
        active: false
      },
      {
        name: "My Reservations",
        to: "/reservations",
        active: false
      }
    ];
    let items = ItemFactory(tempItems);

    const displayLayout = (
      <div>
        <div className="userDetails">Name : {this.props.user.name}</div>
        <div className="userDetails">Phone : {this.props.user.phoneNumber}</div>
        <div className="userDetails">
          Address : {this.props.user.residenceAddress}
        </div>
        <div className="userDetails">
          EmailID : {this.props.user.emailAddress}
        </div>
        <button className="btn btn-success" onClick={this.onEditClick}>
          Edit
        </button>
      </div>
    );

    const editLayout = (
      <div>
        <form onSubmit={this.onSubmitClick}>
          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              defaultValue={this.props.user.name}
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="Enter PhoneNumber"
              defaultValue={this.props.user.phoneNumber}
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="residenceAddress"
              placeholder="Enter Residence Address"
              defaultValue={this.props.user.residenceAddress}
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="emailAddress"
              placeholder="Enter Email"
              defaultValue={this.props.user.emailAddress}
              disabled
            />
          </div>
          <button className="btn btn-success">Save</button>
        </form>
        <button className="btn btn-success" onClick={this.onEditClick}>
          Cancel
        </button>
      </div>
    );

    return (
      <div>
        <Navigationbar navItems={items} />
        <div className="userContainer card">
          {this.state.shouldEdit ? editLayout : displayLayout}

          <button
            name="extend-card"
            className="btn btn-success"
            onClick={this.onSubmitClick}
          >
            Extend Membership by 6 Months?
          </button>

          <button
            name="terminate-card"
            className="btn btn-warning"
          >
            Terminate Membership
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.signin
  };
};

export default connect(mapStateToProps, { fetchUser, updateUser })(UserProfile);
