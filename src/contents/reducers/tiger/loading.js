const tigerLoadingReducer = (state = false, action) => {
	switch(action.type) {
		case "TIGERS_START_LOADING": {
			return true
		}
		case "TIGERS_STOP_LOADING": {
			return false
		}
		default: {
			return state
		}
	}
}

export default tigerLoadingReducer