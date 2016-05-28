const paginateReducer = (state = 1, action) => {
	switch (action.type) {
		case "CHANGE_PAGINATE": {
			return action.paginate
		}
		case "DECREMENT_PAGINATE": {
			return state - 1
		}
		case "INCREMENT_PAGINATE": {
			return state + 1
		}
		default: {
			return state
		}
	}
}

export default paginateReducer