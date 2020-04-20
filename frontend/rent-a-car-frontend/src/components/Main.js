import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import Dashboard from './Dashboard/Dashboard'
import RentalLocations from './Dashboard/RentalLocation'
import VehicleDetail from './Vehicle-Related/VehicleDetail'

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route  exact path = "/" component={Login}/>
                <Route exct path = "/Signup" component={Signup}/>
                <Route exct path = "/dashboard" component={Dashboard}/>
                <Route exct path = "/locations" component={RentalLocations}/>
                <Route exct path = "/vehicledetail/:vid" component={VehicleDetail}/>
            </div>
        )
    }
}
export default Main;