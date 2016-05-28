import * as _ from "lodash"

const tigersReducer = (state = [], action) => {
	switch (action.type) {
		case "UPDATE_TIGERS": {
			return action.tigers
		}
		case "UPDATE_TIGER": {
			let updatedArr = state.slice()
			updatedArr.forEach((item, index) => {
				if (item.id == action.name) {
					updatedArr[index].value = 1
				}
			})
			return updatedArr
		}
		default: {
			return state
		}
	}
}

export default tigersReducer