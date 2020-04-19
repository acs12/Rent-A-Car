import React from 'react'
import Navigationbar from '../Common/Navigation-Related/Navigation'
import ItemFactory from '../Common/Navigation-Related/NavItemFactory'
import VehicleBrowser from '../Dashboard/VehicleBrowser'
import {
    MDBCard
  } from "mdbreact";


class Dashboard extends React.Component {
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