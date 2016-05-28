const failureReducer = (state = false, action) => {
	switch (action.type) {
		case "USER_FAILURE_SHOW": {
			return true
		}
		case "USER_FAILURE_HIDE": {
			return false
		}
		default: {
			return state
		}
	}
}

export default failureReducer