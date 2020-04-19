import React from 'react'
import Navigationbar from '../Common/Navigation-Related/Navigation'
import LocationBrowser from '../Dashboard/LocationBrowser'
import ItemFactory from '../Common/Navigation-Related/NavItemFactory'
import "../../styles/dashboard.styles.css";
import axios from 'axios'
import config from '../../Config/url.helper'

class RentalLocation extends React.Component {

    constructor(props) {
        super(props)
        this.getAllLocations()
    }

    getAllLocations(){
        axios.get(config.baseURL + 'rentalLocations').then((response) => {
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
            active : false, 
        },{
            name : 'Rental Locations', 
            to : '/locations',
            active : true, 
        }]
        let items = ItemFactory(tempItems);
        return(
            <div>
            <Navigationbar navItems = {items}/>            
            <div className = "vehicleBrowser">
            <LocationBrowser />
            </div>
            </div>
        )
    }
}

export default RentalLocation