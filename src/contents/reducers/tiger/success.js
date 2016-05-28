const successReducer = (state = false, action) => {
	switch (action.type) {
		case "USER_SUCCESS_SHOW": {
			return true
		}
		case "USER_SUCCESS_HIDE": {
			return false
		}
		default: {
			return false
		}
	}
}

export default successReducer