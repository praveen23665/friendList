import { combineReducers } from "redux";

import FriendReducer from "./FriendList/reducer";

const rootReducer = combineReducers({
	FriendReducer: FriendReducer,
});

export default rootReducer;
