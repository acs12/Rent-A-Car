import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { addLocation, deleteLocation, getLocation} from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import EditLocation from './editLocation';

//Define a Login Component
class AdminLocation extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            location : [],
            name: "",
            toggle: false,
            address: "",
            capacity: "",
            numOfVehicles: "",
            vehicles: []
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        // this.typeHandler = this.typeHandler.bind(this)
        this.changeToggle = this.changeToggle.bind(this)
        this.addLocation = this.addLocation.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Location : componentDidUpdate CALLED")
        if (prevProps.location !== this.props.location) {
            this.setState({ location: this.props.location })
        }
    }

    componentDidMount = () => {
        this.props.getLocation(res => {
            console.log(res)
        })
        // this.props.getVehicle
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    addLocation = async (e) => {
        e.preventDefault()
        let data = {
            name: this.state.name,
            address: this.state.address,
            capacity: this.state.capacity,
            numOfVehicles: this.state.numOfVehicles,
            vehicles: this.state.vehicles
        }
        console.log("data", data)
        await this.props.addLocation(data, res => {
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
            this.componentDidUpdate(this.props.location)
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

        let locationDetails = null
        if (this.state.toggle === false) {
            if (this.props.location.length === 0) {
                locationDetails = <div>
                    <br></br>
                    <h3>No Locations to display</h3>
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Location</button>
                    <br></br>
                    <br></br>
                </div>
            }
            else {
                locationDetails = <div>
                    <br></br>
                    {this.state.location.map(x => <EditLocation key={x._id} item={x} action={this.update}></EditLocation>)}
                    <br></br>
                    <button onClick={this.changeToggle} style={{ textAlign: "center" }} className="btn btn-primary">Add Location</button>
                    <br></br>
                    <br></br>
                </div>
            }

        }


        else {
            console.log(this.state)
            locationDetails =

                <form onSubmit={this.addLocation}>
                    <br></br>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeToggle}>X</button>
                    <br></br>
                    <b>Enter Location Details :</b>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter location name."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Enter location address."
                        />
                        <br></br>
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="number"
                            className="form-control"
                            name="capacity"
                            placeholder="Enter location capacity."
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
                        {locationDetails}
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
        location: state.adminLocation.data
    }
}

//export Login Component
export default connect(mapStateToProps, { addLocation, getLocation })(AdminLocation);