import { combineReducers} from "redux";
import signin from './signin';
import vehicleReducer from './vehicle.reducer'
import locationReducer from './location.reducer'


const rootReducer = combineReducers({
    signin : signin, 
    vehicles : vehicleReducer,
    locations : locationReducer
})


export default rootReducer;