import { combineReducers} from "redux";
import signin from './signin';
import vehicleReducer from './vehicle.reducer'
import locationReducer from './location.reducer'
import vehicleTypeReducer from './vehicleType'


const rootReducer = combineReducers({
    signin : signin, 
    vehicles : vehicleReducer,
    locations : locationReducer,
    vehicleTypes : vehicleTypeReducer
})


export default rootReducer;