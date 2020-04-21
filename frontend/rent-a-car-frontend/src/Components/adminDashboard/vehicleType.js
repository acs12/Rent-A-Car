import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { addVehicleType, getVehicleType } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import EditVehicleType from './editVehicleType';

//Define a Login Component
class VehicleType extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            typeOfVehicle: "",
            getVehicleTypeDetails: [],
            toggle: false,
            hourlyRate1: "",
            hourlyRate2: "",
            hourlyRate3: "",
            hourlyRate4: "",
            hourRangeRate: "",
            day1: "",
            day2: "",
            day3: "",
            lateFee: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this)
        this.changeToggle = this.changeToggle.bind(this)
        this.addType = this.addType.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("VEHICLE TYPE : componentDidUpdate CALLED")
        if (prevProps.vehicleTypes !== this.props.vehicleTypes) {
            this.setState({ getVehicleTypeDetails: this.props.vehicleTypes })
        }
    }

    componentDidMount = () => {
        this.props.getVehicleType(res => {
            console.log(res)
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    typeHandler = (e) => {
        this.setState({
            typeOfVehicle: e.target.value
        })
    }


    addType = async (e) => {
        e.preventDefault()
        let data = {
            category: this.state.typeOfVehicle,
            hourlyRate: this.state.hourlyRate,
            hour1: this.state.hourlyRate1,
            hour6: this.state.hourlyRate2,
            hour11: this.state.hourlyRate3,
            hour16: this.state.hourlyRate4,
            day1: this.state.day1,
            day2: this.state.day2,
            day3: this.state.day3,
            lateFee: this.state.lateFee
        }
        console.log("data", data)
        await this.props.addVehicleType(data, res => {
            console.log(res)
            if (this.state.toggle === true) {
                this.setState({
                    toggle: false
                })
            }
            else {
                this.setState({
                    toggle: true
                })
            }
            this.componentDidUpdate(this.props.vehicleTypes)
        })
    }

    changeToggle = (e) => {
        e.preventDefault()
        if (this.state.toggle === true) {
            this.setState({
                toggle: false
            })
        }
        else {
            this.setState({
                toggle: true
            })
        }
    }

    render() {

        let typeDetails = null
        if (this.state.toggle === false) {
            if (this.props.vehicleTypes.length === 0) {
                typeDetails = <div>
                    <br></br>
                    <h3>No Vehicle Types to display</h3>
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Vehicle Type</button>
                    <br></br>
                    <br></br>
                </div>
            }
            else {
                typeDetails = <div>
                    <br></br>
                    {this.state.getVehicleTypeDetails.map(x => <EditVehicleType key={x._id} item={x} action={this.update}></EditVehicleType>)}
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Vehicle Type</button>
                    <br></br>
                    <br></br>
                </div>
            }

        }


        else {
            console.log(this.state)
            typeDetails =

                <form onSubmit={this.addType}>
                    <br></br>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeToggle}>X</button>
                    <br></br>
                    <b>Enter Vehicle Details :</b>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="typeOfVehicle"
                            placeholder="Enter vehicle type."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="hourlyRate"
                            placeholder="Enter hourly rate for this vehicle type."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="hourlyRate1"
                            placeholder="Enter hourly rate for 1-5 hours."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="hourlyRate2"
                            placeholder="Enter hourly rate for 6-10 hours."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="hourlyRate3"
                            placeholder="Enter hourly rate for 11-15 hours."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="hourlyRate4"
                            placeholder="Enter hourly rate for 16-20 hours."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="day1"
                            placeholder="Enter rate for a day."
                        />
                        <br></br>
                    </div>


                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="day2"
                            placeholder="Enter rate for 2 days."
                        />
                        <br></br>
                    </div>


                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="day3"
                            placeholder="Enter rate for 3 days."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="lateFee"
                            placeholder="Enter late fee charge for this vehicle."
                        />
                        <br></br>
                    </div>



                    <button type="submit" className="btn btn-primary">Save</button>
                    <br></br><br></br>

                </form>
        }
        return (
            <div>
                <MDBContainer>
                    <MDBCol>

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }}>
                        {typeDetails}
                    </MDBCol>
                    <MDBCol>

                    </MDBCol>

                </MDBContainer>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicleTypes: state.vehicleTypes.data
    }
}

//export Login Component
export default connect(mapStateToProps, { addVehicleType, getVehicleType })(VehicleType);