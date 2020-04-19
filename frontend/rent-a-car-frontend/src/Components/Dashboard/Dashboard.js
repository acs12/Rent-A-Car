import React from 'react'
import Navigationbar from '../Common/Navigation-Related/Navigation'
import ItemFactory from '../Common/Navigation-Related/NavItemFactory'
import VehicleBrowser from '../Dashboard/VehicleBrowser'
import {
    MDBCard
  } from "mdbreact";
import axios from 'axios'
import config from '../../Config/url.helper'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.getAllVehicles()
    }

    getAllVehicles(){
        axios.get(config.baseURL + 'vehicles').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
            }
        }).catch((error) => {

        })
    }

    render(){
        let tempItems = [{
            name : 'Vehicles', 
            to : '/dashboard', 
            active : true, 
        },{
            name : 'Rental Locations', 
            to : '/locations',
            active : false, 
        }]
        let items = ItemFactory(tempItems);
        return(
            <div>
            <Navigationbar navItems = {items}/>            
            <div className = "vehicleBrowser">
            <VehicleBrowser title = {'San Jose'}/>
            </div>
            </div>
        )
    }
}

export default Dashboard