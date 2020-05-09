import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {
    MDBContainer,
    MDBCol,
    MDBRow
  } from "mdbreact";
import { deleteUser, getUser } from '../../redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
//Define a Login Component
class ApproveUser extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            user: [],
            currentPage: 1,
            itemsPerPage: 3
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
    }

    componentDidMount = () => {
        if (localStorage.getItem('token') !== undefined) {
            this.props.getUser(res => {
                if (res.data !== undefined) {
                    this.setState({
                        user: res.data
                    })
                }
            })
        }
    }

    changeHandler = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    logoutUser = (e) => {
        e.preventDefault()
    }

    delete = async (e, id, isValid) => {
        e.preventDefault();
        let data = {
            _id: id,
            isValidated: isValid
        }
        await this.props.deleteUser(data, res => {
            console.log(res)
        })
        this.componentDidMount()

    }

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token") || localStorage.getItem("manager") === "false") {
            localStorage.removeItem("token")
            localStorage.removeItem("admin")
            localStorage.removeItem("manager")
            localStorage.removeItem("id")
            redirectVar = <Redirect to="/" />
        }
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)

        let tempItems = [
            {
                name: "Users",
                to: "/approveUser",
                active: true
            }
        ];
        let items = ItemFactory(tempItems);
        console.log(this.state)
       
        let userDetails = null
        const currentItems = this.state.user.slice(indexOfFirstTodo, indexOfLastTodo);

        userDetails =
            <div>
                {currentItems.map(x => {
                    if (x.isValidated === true) {
                        return (
                            <div className="row" style={{ margin: "10px" }}>
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-4 card">
                                    <div className="card-body">
                                        <h4 className="card-title">{x.name}</h4><br />
                                        <img style={{ width: "70%", height: "70%" }} alt="Oops" src={x.dlImage} /><br />
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
                                        <br />
                                        <img style={{ width: "70%", height: "70%" }} alt="Oops" src={x.dlImage} /><br /><br />
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

        const pageNumbers = [];

        for (let i = 0; i <= Math.ceil(this.state.user.length / itemsPerPage) + 1; i++) {
            pageNumbers.push(i);
        }

        let renderPageNumbers = null;

        renderPageNumbers = (
            <nav aria-label="Page navigation example" class="pagebar">
                <ul class="pagination">
                    {pageNumbers.map((i) => <li class="page-item" style={{ color: "white" }}><a key={i} id={i} onClick={() => { this.handleClick(i) }} style={{color : "white"}} class="page-link" href="#">{i}</a></li>)}
                </ul>
            </nav>
        );
        return (
            <div>
                <Navigationbar navItems={items} profileAction={'/myProfile'} />
                {redirectVar}
                {userDetails}
                <MDBRow >
                    <MDBCol></MDBCol>
                    <MDBCol style={{ textAlign: "left" }}>
                        {renderPageNumbers}
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
            </div>
        )
    }

}

//export Login Component

export default connect(null, { deleteUser, getUser })(ApproveUser);