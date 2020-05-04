import { combineReducers} from "redux";
import signin from './signin';
import vehicleReducer from './vehicle.reducer'
import locationReducer from './location.reducer'
import vehicleTypeReducer from './vehicleType'
import adminLocationReducer from './location'
import adminVehicleReducer from './vehicle'
import adminUserUpdate from './userReducer'
import bookingReducer from './booking.reducer'

const rootReducer = combineReducers({
    signin : signin, 
    vehicles : vehicleReducer,
    locations : locationReducer,
    vehicleTypes : vehicleTypeReducer,
    adminLocation : adminLocationReducer,
    adminVehicle : adminVehicleReducer,
    adminUser : adminUserUpdate,
    reservations : bookingReducer
})


export default rootReducer;