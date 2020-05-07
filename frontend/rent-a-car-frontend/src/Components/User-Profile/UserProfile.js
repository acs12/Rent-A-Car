import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import { connect } from "react-redux";
import "../../styles/profile.styles.css";
import { fetchUser } from "../../redux/actions/fetchAction";
import { updateUser } from "../../redux/actions/setAction";
import { Redirect } from "react-router-dom";
import CommentModal from "../Common/CommentModal";
import {deleteUser} from '../../redux/actions/actionUser'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldEdit: false };
    this.onEditClick = this.onEditClick.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onExtendClick = this.onExtendClick.bind(this);
    this.onSubmitExtendClick = this.onSubmitExtendClick.bind(this);
    this.onTerminateClick = this.onTerminateClick.bind(this);
    this.shoudlTerminate = this.shoudlTerminate.bind(this);
  }

  componentDidMount() {
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

  shoudlTerminate(e) {
    e.preventDefault();
    let data = {
      _id: this.props.user._id,
      isValidated: false
  }
    this.props.deleteUser(data, (error, result) => {
        this.onTerminateClick(e)
        this.onLogoutClick(e)
    })
  }

  onTerminateClick(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        showTerminateModal : !prevState.showTerminateModal
      };
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    localStorage.removeItem("manager");
    localStorage.removeItem("token");
    this.setState(prevState => {
      return {
        ...prevState,
        shouldLogout: <Redirect to="/" />
      };
    });
  }

  onSubmitClick(e) {
    e.preventDefault();
    let requestData = { userId: localStorage.getItem("id") };
    if (e.target.name === "extend-card") {
      requestData = { ...requestData, extendCard: true };
    } else {
      requestData = { ...requestData, ...this.state };
    }
    if (this.state.shouldEdit) {
      this.props.updateUser(requestData, result => {
        this.onEditClick(e);
      });
    }
  }

  onSubmitExtendClick(e) {
    e.preventDefault();
    let requestData = { userId: localStorage.getItem("id") };
    requestData = { ...requestData, extendCard: true };
    if (this.state.showModal) {
      this.props.updateUser(requestData, result => {
        this.onExtendClick(e);
      });
    }
  }

  onExtendClick(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  "
    );
  }

  render() {
    const commentModal = (
      <CommentModal
        show={true}
        title="Do you want to extend your membership?"
        closeTitle={"Close"}
        submitTitle={`Pay $${this.props.user.membershipFee}?`}
        onClose={this.onExtendClick}
        onSubmit={this.onSubmitExtendClick}
      >
        <div>
          <h5>
            Your current membership is valid upto{" "}
            <b>{this.formatDate(this.props.user.accountExpiry)}</b>
          </h5>
        </div>
        <div>
          <h6>
            Do you want to extend for 6 months using your card{" "}
            <b>{this.props.user.creditCardInfo}</b>?
          </h6>
        </div>
      </CommentModal>
    );


    const terminateModal = (
      <CommentModal
        show={true}
        title="Are you sure?"
        closeTitle={"Close"}
        submitTitle={`Terminate Membership`}
        onClose={this.onTerminateClick}
        onSubmit={this.shoudlTerminate}
      >
        <div>
          <h5>
            Your current membership is valid upto{" "}
            <b>{this.formatDate(this.props.user.accountExpiry)}</b>
          </h5>
        </div>
        <div>
          <h6>
            Do you want to terminate your membership ?
          </h6>
        </div>
      </CommentModal>
    );

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
          Email : {this.props.user.emailAddress}
        </div>
        <div style = {{width : "50%"}}>
          <button className="btn btn-success" onClick={this.onEditClick}>
            Edit
          </button>
          <button className="btn btn-default" onClick={this.onLogoutClick}>
            Logout
          </button>

          <button
            name="extend-card"
            className="btn btn-primary"
            onClick={this.onExtendClick}
          >
            Extend Membership?
          </button>

          <button name="terminate-card" className="btn btn-red" onClick = {this.onTerminateClick}>
            Terminate Membership
          </button>
        </div>
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
        {this.state.shouldLogout}
        {this.state.showModal && commentModal}
        {this.state.showTerminateModal && terminateModal}
        
        <Navigationbar
          navItems={items}
          profileAction={"/myProfile"}
          isUser={true}
        />
        <div className="userContainer card">
          {this.state.shouldEdit ? editLayout : displayLayout}
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

export default connect(mapStateToProps, { fetchUser, updateUser, deleteUser })(UserProfile);
