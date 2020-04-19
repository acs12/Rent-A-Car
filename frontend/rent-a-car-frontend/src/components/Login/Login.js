import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";



//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {

        e.preventDefault();
        const Login = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('', Login)
            .then(response => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="3">

                        </MDBCol>
                        <MDBCol style={{ textAlign: "center" }} md="4">
                            <form onSubmit={this.submitLogin}>
                                <div style={{ textAlign: "center" }}>
                                    <h1>ZipCar</h1>

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
                                    <button className="btn btn-success">Login</button>

                                    <br></br><br></br>

                                    <h5>Don't have an account? Go to <Link to="/Signup"> Signup Page</Link></h5>
                                    <br></br>
                                </div>
                            </form>
                        </MDBCol>
                        <MDBCol md="3">

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )
    }
}
//export Login Component
export default Login;