import * as actions from "./actions";
const intialState = {
	friendList: [],
};

const FriendReducer = (state = intialState, action) => {
	switch (action.type) {
		case actions.ADD_FRIEND:
			return {
				...state,
				friendList: [...state.friendList, action.payload],
			};

			break;

		case actions.DELETE_FRIEND:
			return {
				...state,
				friendList: [
					...state.friendList.filter((item) => item.id != action.payload.id),
				],
			};

			break;
		case actions.FAVOURITE_FRIEND:
			let friend = state.friendList.map((item) => {
				if (item.id == action.payload.id) {
					item.favourite = !item.favourite;
				}
				return item;
			});

			return {
				...state,
				friendList: [...friend],
			};

			break;

		default:
			return state;
			break;
	}
};

export default FriendReducer;
