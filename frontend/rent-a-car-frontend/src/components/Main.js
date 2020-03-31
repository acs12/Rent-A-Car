import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup'





//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route  exact path = "/" component={Login}/>
                <Route exct path = "/Signup" component={Signup}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;