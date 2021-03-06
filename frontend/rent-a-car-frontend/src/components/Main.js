import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import Dashboard from './Dashboard/Dashboard'
import RentalLocations from './Dashboard/RentalLocation'
import VehicleDetail from './Vehicle-Related/VehicleDetail'
import VehicleType from './adminDashboard/vehicleType'
import AdminLocation from './adminDashboard/addLocation'
import AdminVehicle from './adminDashboard/addVehicle'
import MyProfile from './User-Profile/UserProfile'
import User from './adminDashboard/updateUser'
import Booking from './Vehicle-Related/VehicleBookings'
import ApproveUser from './Manager/approveUser'
import LocationDetails from './Location-Related/LocationDetail'

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route  exact path = "/" component={Login}/>
                <Route exact path = "/Signup" component={Signup}/>
                <Route exact path = "/dashboard" component={Dashboard}/>
                <Route exact path = "/locations" component={RentalLocations}/>
                <Route exact path = "/type" component={VehicleType}/>
                <Route exct path = "/vehicledetail/:vid" component={VehicleDetail}/>
                <Route exact path = "/adminLocation" component={AdminLocation}/>
                <Route exact path = "/adminVehicle" component={AdminVehicle}/>
                <Route exact path = "/myProfile" component={MyProfile}/>
                <Route exact path = "/adminUser" component={User}/>
                <Route exact path = "/reservations" component={Booking}/>
                <Route exact path = "/approveUser" component={ApproveUser}/>
                <Route exact path = "/locations/:locationID" component={LocationDetails}/>
                
            </div>
        )
    }
}
export default Main;