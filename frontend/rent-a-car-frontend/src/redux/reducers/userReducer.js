import { DELETE_USER,GET_USER} from "../types/adminUser";

const initialState = {
  users: []
};

const adminUserUpdate = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER:
      console.log("AP", action.payload)
      return {
        ...state,
        users: action.payload
      };

    case DELETE_USER:
      console.log("AP", action.payload)
      return {
        ...state,
        users: action.payload
      };

    default:
      return state;
  }
};

export default adminUserUpdate;
