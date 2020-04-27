import { combineReducers} from "redux";
import signin from './signin';
import vehicleReducer from './vehicle.reducer'
import locationReducer from './location.reducer'
import vehicleTypeReducer from './vehicleType'
import adminLocationReducer from './location'
import adminVehicleReducer from './vehicle'


const rootReducer = combineReducers({
    signin : signin, 
    vehicles : vehicleReducer,
    locations : locationReducer,
    vehicleTypes : vehicleTypeReducer,
    adminLocation : adminLocationReducer,
    adminVehicle : adminVehicleReducer

})


export default rootReducer;