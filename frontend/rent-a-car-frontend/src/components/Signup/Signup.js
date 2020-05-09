import React, { Component } from "react";
import "../../App.css";
import { Link, Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { connect } from "react-redux";
import { signup } from "../../redux/actions/actionSignin";

//Define a Signup Component
class Signup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      type: "I'M",
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      drivingLicense: "",
      address: "",
      creditCard: "",
      error: ""
    };
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    this.changeFileHandler = this.changeFileHandler.bind(this);
    this.typeHandler = this.typeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }

  typeHandler = e => {
    this.setState({
      type: e.target.value
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeFileHandler = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  //submit Signup handler to send a request to the node backend
  submitSignup = async e => {
    e.preventDefault();
    if (this.state.type === "Admin") {
      const data = {
        admin: true,
        manager: false,
        emailAddress: this.state.email,
        password: this.state.password
      };
      await this.props.signup(data, res => {
        if (res.data.message) {
          this.setState({ error: res.data.message });
        } else {
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("admin", res.data.admin);
          localStorage.setItem("manager", res.data.manager);
          localStorage.setItem('token', res.data.token)
          this.setState({ redirectVar: <Redirect to="/adminLocation" /> });
        }
      });
    } else if (this.state.type === "Manager") {
      const data = {
        manager: true,
        admin: false,
        emailAddress: this.state.email,
        password: this.state.password
      };
      await this.props.signup(data, res => {
        if (res.data.message) {
          this.setState({ error: res.data.message });
        } else {
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("admin", res.data.admin);
          localStorage.setItem("manager", res.data.manager);
          localStorage.setItem('token', res.data.token)
          this.setState({ redirectVar: <Redirect to="/approveUser" /> });
        }
      });
    } else {
      const data = {
        admin: false,
        manager: false,
        name: this.state.name,
        emailAddress: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
        drivingLicense: this.state.drivingLicense,
        residenceAddress: this.state.address,
        creditCardInfo: this.state.creditCard
      };
      await this.props.signup(data, res => {
        console.log('CHECK', res)
        if (res.status === 200) {
          if (res.data.message) {
            this.setState({ error: <div className="alert alert-danger" role="alert">res.data.message</div> });
          } else {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem("id", res.data._id);
            localStorage.setItem("admin", res.data.admin);
            localStorage.setItem("manager", res.data.manager);
            if (res.data.admin === true) {
              this.setState({ redirectVar: <Redirect to="/adminLocation" /> });
            } else if (res.data.manager === true) {
              this.setState({ redirectVar: <Redirect to="/approveUser" /> });
            } else {
              this.setState({ redirectVar: <Redirect to="/dashboard" /> });
            }
          }
        }
      });
    }
  };

  render() {
    let formElement = null;
    if (this.state.type === "Admin" || this.state.type === "Manager") {
      formElement = (
        <div>
          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email Address"
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <br></br>
          <div style={{ textAlign: "center" }}>
            {!this.state.isLoading && (
              <button className="btn btn-success">Signup</button>
            )}
            {this.state.isLoading && (
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      );
    } else if (this.state.type === "User") {
      formElement = (
        <div>
          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email Address"
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name "
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="number"
              className="form-control"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <div className="form-group">
            Upload Driving License
            <input
              onChange={this.changeFileHandler}
              type="file"
              className="form-control"
              name="drivingLicense"
              placeholder="Upload Driving License"
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter Address"
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="number"
              className="form-control"
              name="creditCard"
              placeholder="Enter Credit Card Number"
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <br></br>
          <div style={{ textAlign: "center" }}>
            {!this.state.isLoading && (
              <button className="btn btn-success">Signup</button>
            )}
            {this.state.isLoading && (
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="card entryPages">
        {this.state.redirectVar}

        <form onSubmit={this.submitSignup}>
          <div style={{ textAlign: "center" }}>
            <h1>Rent-A-Car</h1>
            <br></br>
            <h4>Sign Up</h4>
          </div>
          <br></br>
          <div style={{ textAlign: "center" }}>
            <MDBDropdown >
              <MDBDropdownToggle caret color="success">
                {this.state.type}
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem value="Admin" onClick={this.typeHandler}>
                  Admin
              </MDBDropdownItem>
                <MDBDropdownItem value="User" onClick={this.typeHandler}>
                  User
              </MDBDropdownItem>
                <MDBDropdownItem value="Manager" onClick={this.typeHandler}>
                  Manager
              </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <br></br>
          <div style={{ width: "70%", margin: "16px auto" }}>
            {formElement}
          </div>


          <br></br>
          <br></br>
          <h4>{this.state.error}</h4>
          <div style={{textAlign : "center"}}>
            <h5>
              Already have an account? Go to <Link to="/"> Login Page</Link>
            </h5>
          </div>

          <br></br>
        </form>
      </div>
    );
  }
}
//export Signup Component
export default connect(null, { signup })(Signup);
