import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
// import { addVehicleType, getVehicleType } from '../../redux'
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
            carname: "",
            toggle: false,
            type: "",
            make: "",
            modelYear: "",
            currentMileage: "",
            condition: "",
            timeLastServiced: "",
            rentalLocation: "",
            vehicles: []
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this)
        this.changeToggle = this.changeToggle.bind(this)
        this.addVehicle = this.addVehicle.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("VEHICLE : componentDidUpdate CALLED")
        if (prevProps.vehicles !== this.props.vehicles) {
            this.setState({ vehicles: this.props.vehicles })
        }
    }

    componentDidMount = () => {
        // this.props.getVehicleType(res => {
        //     console.log(res)
        // })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    addVehicle = async (e) => {
        e.preventDefault()
        let data = {
            carname: this.state.carname,
            type: this.state.type,
            make: this.state.make,
            modelYear: this.state.modelYear,
            currentMileage: this.state.currentMileage,
            condition: this.state.condition,
            timeLastServiced: this.state.timeLastServiced,
            rentalLocation: this.state.rentalLocation,

        }
        console.log("data", data)
        // await this.props.addVehicleType(data, res => {
        //     console.log(res)
        //     if (this.state.toggle === true) {
        //         this.setState({
        //             toggle: false
        //         })
        //     }
        //     else {
        //         this.setState({
        //             toggle: true
        //         })
        //     }
        //     this.componentDidUpdate(this.props.vehicleTypes)
        // })
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

        let vehicleDetails = null
        if (this.state.toggle === false) {
            if (this.props.vehicles.length === 0) {
                vehicleDetails = <div>
                    <br></br>
                    <h3>No Vehicle to display</h3>
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Vehicle Type</button>
                    <br></br>
                    <br></br>
                </div>
            }
            else {
                vehicleDetails = <div>
                    <br></br>
                    {this.state.vehicles.map(x => <EditVehicle key={x._id} item={x} action={this.update}></EditVehicle>)}
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Vehicle</button>
                    <br></br>
                    <br></br>
                </div>
            }

        }


        else {
            console.log(this.state)
            vehicleDetails =

                <form onSubmit={this.addVehicle}>
                    <br></br>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeToggle}>X</button>
                    <br></br>
                    <b>Enter Vehicle Details :</b>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="carname"
                            placeholder="Enter vehicle name."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="make"
                            placeholder="Enter brand of car."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="modelYear"
                            placeholder="Enter vehicle's model year."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="currentMileage"
                            placeholder="Enter current mileage of car."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="condition"
                            placeholder="Enter condition of car(good, needs cleaning, needs maintenance)."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="date"
                            className="form-control"
                            name="timeLastServiced"
                            placeholder="Enter when was vehicle last serviced."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="rentalLocation"
                            placeholder="Enter rental location ID."
                        />
                        <br></br>
                    </div>


                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="type"
                            placeholder="Enter type of car."
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
                        {vehicleDetails}
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