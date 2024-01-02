// third-party
import { combineReducers } from "redux";

// project import
import auth from "./auth/authSlice";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ auth });

export default reducers;
