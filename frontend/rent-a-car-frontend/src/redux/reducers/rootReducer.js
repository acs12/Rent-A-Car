import { combineReducers} from "redux";
import signin from './signin';


const rootReducer = combineReducers({
    signin : signin
})


export default rootReducer;