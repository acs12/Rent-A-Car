import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { deleteUser, getUser } from '../../redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

//Define a Login Component
class User extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            user: []
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
    }

    componentDidMount = () => {
        console.log("inside component did mount user")
        this.props.getUser(res => {
            console.log(res.data)
            this.setState({
                user: res.data
            })
        })
    }

    changeHandler = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    delete = async (e, id, isValid) => {
        e.preventDefault();
        let data = {
            _id: id,
            isValidated : isValid 
        }
        await this.props.deleteUser(data, res => {
            console.log(res)
        })
        this.componentDidMount()

    }


    render() {
        console.log(this.state)
        let redirectVar = null;
        // if (!localStorage.getItem("token")) {
        //     redirectVar = <Redirect to="/StudentLogin" />
        // }
        let userDetails = null

        userDetails =
            <div>
                {this.state.user.map(x => {
                    if (x.isValidated === true) {
                        return (
                            <div className="row" style={{ margin: "10px" }}>
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-4 card">
                                    <div className="card-body">
                                        <h4 className="card-title">{x.name}</h4>
                                        <button style={{ width: "50%", height: "50" }} className="btn btn-danger" type="button" onClick={(e) => { this.delete(e, x._id, false) }}>Invalidate</button>
                                        <br></br>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                </div>
                            </div>

                        )
                    }
                    else {
                        return (
                            <div className="row" style={{ margin: "10px" }}>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-4 card">
                                <div className="card-body">
                                    <h4 className="card-title">{x.name}</h4>
                                    <button style={{ width: "50%", height: "50" }} className="btn btn-success" type="button" onClick={(e) => { this.delete(e, x._id, true) }}>Validate</button>
                                    <br></br>
                                </div>
                            </div>

                            <div className="col-md-3">
                            </div>
                        </div>
                        )
                    }

                })
                }
            </div>

        return (
            <div>
                {redirectVar}
                {userDetails}

            </div>
        )
    }

}

//export Login Component

export default connect(null, { deleteUser, getUser })(User);