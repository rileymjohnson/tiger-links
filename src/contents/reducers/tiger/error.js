const tigersErrorReducer = (state = false, action) => {
	switch(action.type) {
		case "TIGERS_LOADING_ERROR": {
			return true
		}
		case "TIGERS_LOADING_ERROR_RESOLVED": {
			return false
		}
		default: {
			return false
		}
	}
}

export default tigersErrorReducer