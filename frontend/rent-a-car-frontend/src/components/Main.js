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
import User from './adminDashboard/updateUser'


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
                <Route exact path = "/adminUser" component={User}/>
            </div>
        )
    }
}
export default Main;