const tigersFilterReducer = (state = "", action) => {
	switch(action.type) {
		case "UPDATE_TIGERS_FILTER": {
			return action.filter
		}
		default: {
			return state
		}
	}
}

export default tigersFilterReducer