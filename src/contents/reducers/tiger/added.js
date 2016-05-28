//this is used for when a person has just signed in

const addedReducer = (state = false, action) => {
	switch (action.type) {
		case "TIGER_SIGNED_IN": {
			return true
		}
		case "TIGER_CLOSE_TOAST": {
			return false
		}
		default: {
			return state
		}
	}
}

export default addedReducer