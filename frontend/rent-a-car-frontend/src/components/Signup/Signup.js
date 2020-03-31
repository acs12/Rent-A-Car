import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBRow, MDBCol, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";



//Define a Signup Component
class Signup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            type: "I'M",
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            drivingLicense: "",
            address: "",
            creditCard: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this)
        this.submitSignup = this.submitSignup.bind(this);
    }

    typeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Signup handler to send a request to the node backend
    submitSignup = (e) => {

        e.preventDefault();
        const Signup = {
            type: this.state.type,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            drivingLicense: this.state.drivingLicense,
            address: this.state.address,
            creditCard: this.state.creditCard
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('', Signup)
            .then(response => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        let formElement = null
        if (this.state.type === "Admin" || this.state.type === "Manager") {
            formElement = <div>
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
                    <button className="btn btn-success">Signup</button>
                </div>
            </div>
        }

        else if (this.state.type === "User") {
            formElement = <div>
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
                        name="username"
                        placeholder="Enter Username "
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
                    Enter Picture of Driving License
                    <input
                        onChange={this.changeHandler}
                        type="file"
                        className="form-control"
                        name="drivingLicense"
                        placeholder="Enter the picture of Driving License"
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
                        name="creditCardNumber"
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
                    <button className="btn btn-success">Signup</button>
                </div>
            </div>
        }
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="3">

                        </MDBCol>
                        <MDBCol style={{ textAlign: "center" }} md="4">
                            <form onSubmit={this.submitSignup}>

                                <div style={{ textAlign: "center" }}>
                                    <h1>ZipCar</h1>
                                    <br></br>
                                    <h4>Sign Up</h4>
                                </div>
                                <br></br>

                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="success">{this.state.type}</MDBDropdownToggle>
                                    <MDBDropdownMenu basic >
                                        <MDBDropdownItem value="Admin" onClick={this.typeHandler}>Admin</MDBDropdownItem>
                                        <MDBDropdownItem value="User" onClick={this.typeHandler}>User</MDBDropdownItem>
                                        <MDBDropdownItem value="Manager" onClick={this.typeHandler}>Manager</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                                <br></br>

                                {formElement}

                                <br></br><br></br>

                                <h5>Already have an account? Go to <Link to="/"> Login Page</Link></h5>
                                <br></br>

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
//export Signup Component
export default Signup;