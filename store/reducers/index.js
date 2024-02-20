// third-party
import { combineReducers } from "redux";

// project import
import auth from "./auth/authSlice";
import form from "./intakeForm/intakeFormSlice";
import complaint from "./complaint/complaintSlice";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ auth, form, complaint });

export default reducers;
