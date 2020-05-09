import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import { login } from "../../redux/actions/actionSignin";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  submitLogin = async e => {
    e.preventDefault();
    const data = {
      emailAddress: this.state.email,
      password: this.state.password
    };
    this.setState({ isLoading: true });
    await this.props.login(data, res => {
      console.log(res)
      if (res.status === 200) {
        if (res.data.message !== undefined) {
          this.setState({ isLoading: false, error: res.data.message });
        } else {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("admin", res.data.admin);
          localStorage.setItem("manager", res.data.manager);
        }
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false, error: <div className="alert alert-danger" role="alert">Invalid Credentials!</div> });
      }
    });
  };

  render() {
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("admin") === "true") {
        redirectVar = <Redirect to="/adminLocation" />;
      } else if (localStorage.getItem("manager") === "true") {
        redirectVar = <Redirect to="/approveUser" />;
      } else {
        redirectVar = <Redirect to="/dashboard" />;
      }
    }
    return (
      <div className="backgroundImage">
        {redirectVar}
        <div className="card entryPages" >
          <form onSubmit={this.submitLogin}>
            <div style={{ textAlign: "center" }}>
              <h1>Rent-A-Car</h1>

              <br></br>

              <h4>Sign In</h4>
            </div>
            <br></br>

            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email Address"
                style={{ width: "60%", margin: "16px auto" }}
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
                style={{ width: "60%", margin: "16px auto" }}
                required
              />
            </div>

            <br></br>
            <div style={{ textAlign: "center" }}>
              {!this.state.isLoading && (
                <button className="btn btn-success">Login</button>
              )}
              {this.state.isLoading && (
                <div class="spinner-border text-success" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              <div>
                <br/>
                {this.state.error}
              </div>
              <br></br>
              <br></br>

              <h5>
                Don't have an account? Go to{" "}
                <Link to="/Signup"> Signup Page</Link>
              </h5>
              <br></br>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
//export Login Component
export default connect(null, { login })(Login);
