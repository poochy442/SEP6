import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import ratingsReducer from "./ratingsReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	review: reviewReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	ratingsReducer: ratingsReducer
})

export default rootReducer