import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import Dashboard from './Dashboard/Dashboard'
import RentalLocations from './Dashboard/RentalLocation'
import VehicleType from './adminDashboard/vehicleType'





//Create a Main Component
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
            </div>
        )
    }
}
//Export The Main Component
export default Main;