import React from 'react'
import Navigationbar from '../Common/Navigation-Related/Navigation'
import LocationBrowser from '../Dashboard/LocationBrowser'
import ItemFactory from '../Common/Navigation-Related/NavItemFactory'
import "../../styles/dashboard.styles.css";
import { fetchLocations } from "../../redux/actions/fetchAction";
import { connect } from "react-redux";

class RentalLocation extends React.Component {

    constructor(props) {
        super(props)
        this.getAllLocations()
    }

    async getAllLocations(){
        await this.props.fetchLocations(result => {
            console.log(result);
          });
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

export default connect(null, {fetchLocations})(RentalLocation);