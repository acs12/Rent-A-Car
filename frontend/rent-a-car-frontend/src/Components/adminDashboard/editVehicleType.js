import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { updateVehicleType, deleteType } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

//Define a Login Component
class EditVehicleType extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            _id: this.props.item._id,
            existingVehicleTypeStatus: false,
            category: this.props.item.category,
            hourlyRate: this.props.item.hourlyRate,
            hour1: this.props.item.hour1,
            hour6: this.props.item.hour6,
            hour11: this.props.item.hour11,
            hour16: this.props.item.hour16,
            day1: this.props.item.day1,
            day2: this.props.item.day2,
            day3: this.props.item.day3,
            lateFee : this.props.lateFee,
            response: ""
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
        this.changeExistingTypeToggle = this.changeExistingTypeToggle.bind(this)
        this.updateVehicleType = this.updateVehicleType.bind(this)
    }

    // componentDidMount = () => {
    //     let sDate = String(this.props.item.startDate)
    //     let eDate = String(this.props.item.endDate)
    //     sDate = sDate.slice(0, 10)
    //     eDate = eDate.slice(0, 10)
    //     this.setState({
    //         startDate: sDate,
    //         endDate: eDate
    //     })
    // }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateVehicleType = async (e) => {
        //prevent page from refresh
        e.preventDefault();
        let data = {
            _id: this.state._id,
            category: this.state.category,
            hourlyRate: this.state.hourlyRate,
            hour1: this.state.hour1,
            hour6: this.state.hour6,
            hour11: this.state.hour11,
            hour16: this.state.hour16,
            day1: this.state.day1,
            day2: this.state.day2,
            day3: this.state.day3,
            lateFee :  this.state.lateFee
        }

        await this.props.updateVehicleType(data, res => {
            console.log("experience res", res)
            if (this.state.existingVehicleTypeStatus === true) {
                this.setState({
                    existingVehicleTypeStatus: false
                })
            }
            else {
                this.setState({
                    existingVehicleTypeStatus: true
                })
            }
        })

    }

    delete = async (e) => {
        e.preventDefault();
        let data = {
            _id: this.state._id
        }
        await this.props.deleteType(data, res => {
            console.log(res)
        })

    }


    changeExistingTypeToggle = (e) => {

        if (this.state.existingVehicleTypeStatus === true) {
            this.setState({
                existingVehicleTypeStatus: false
            })
        }
        else {
            this.setState({
                existingVehicleTypeStatus: true
            })
        }

    }

    render() {
        console.log(this.state)
        let redirectVar = null;
        // if (!localStorage.getItem("token")) {
        //     redirectVar = <Redirect to="/StudentLogin" />
        // }

        let existTypeDetails = null
        if (this.state.existingVehicleTypeStatus === false) {

            existTypeDetails = <div>
                <div className="card">
                    <div className="card-body" style={{ textAlign: "left" }}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button>
                        <h4 className="card-title"> Category : {this.props.item.category}</h4>
                        <h5 className="card-subtitle mb-2 text-muted">Hourly Rate : {this.props.item.hourlyRate}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Hours (1-5) : {this.state.hour1}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Hours (6-10) : {this.props.item.hour6}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Hours (11-15) : {this.props.item.hour11}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Hours (16-20) : {this.props.item.hour16}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">1 Day : {this.props.item.day1}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">2 Days : {this.props.item.day2}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">3 Days : {this.props.item.day3}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Late Fee Charge : {this.props.item.lateFee}</h5>
                        <button type="button" className="btn btn-primary" onClick={this.changeExistingTypeToggle}>Edit</button>
                        <br></br>
                    </div>
                </div>
            </div>
        }
        else {

            existTypeDetails =
            <div className="card" style={{ padding: 16, margin: 16 }}>
            <div style={{ width: "40%", margin: "16px auto" }}>
                
                    <br></br>
                    <form onSubmit={this.updateVehicleType}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeExistingTypeToggle}>X</button>
                        <br></br>
                        <br></br>
                        <div className="form-group">
                            Category:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="category"
                                placeholder={this.props.item.category}
                                
                            />
                        </div>

                        <div className="form-group">
                            Hourly Rate:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="hourlyRate"
                                placeholder={this.props.item.hourlyRate}
                                
                            />
                        </div>

                        <div className="form-group">
                            Hours (1-5):
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="hour1"
                                placeholder={this.props.item.hour1}
                            />
                        </div>

                        <div className="form-group">
                            Hours (6-10):
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="hour6"
                                placeholder={this.props.item.hour6}
                                
                            />
                        </div>

                        <div className="form-group">
                            Hours (11-15):
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="hour11"
                                placeholder={this.props.item.hour11}
                            />
                        </div>

                        <div className="form-group">
                            Hours (16-20):
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="hour16"
                                placeholder={this.props.item.hour16}
                            />
                        </div>

                        <div className="form-group">
                            1 Day:
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="day1"
                                placeholder={this.props.item.day1}
                            />
                        </div>

                        <div className="form-group">
                            2 Days:
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="day2"
                                placeholder={this.props.item.day2}
                            />
                        </div>

                        <div className="form-group">
                            3 Days:
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="day3"
                                placeholder={this.props.item.day3}
                            />
                        </div>

                        <div className="form-group">
                            Late Return Fee
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="lateFee"
                                placeholder={this.props.item.lateFee}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Save</button>
                        <br></br>
                    </form>
                </div>
                </div>

        }
        return (
            <div>
                <div key={this.props.item._id}></div>
                {redirectVar}
                {existTypeDetails}

            </div>
        )
    }
}
//export Login Component
export default connect(null, { updateVehicleType, deleteType })(EditVehicleType);