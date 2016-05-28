import * as axios from "axios"

function getTigers() {
	return axios.get("http://162.243.84.167:3000/")
}

export function updateTigers() {
	return function(dispatch) {
		return getTigers().then(
			(data) => {
				dispatch({
					type: "TIGERS_STOP_LOADING"
				})
				dispatch({
					type: "UPDATE_TIGERS",
					tigers: data.data
				})
			},
			(error) => {
				dispatch({
					type: "TIGERS_LOADING_ERROR"
				})
			}
			)
	}
}

export function tigersLoading() {
	return {
		type: "TIGERS_START_LOADING"
	}
}

export function updateFilter(filter) {
	return {
		type: "UPDATE_TIGERS_FILTER",
		filter
	}
}

export function changePaginate(paginate) {
	return {
		type: "CHANGE_PAGINATE",
		paginate
	}
}

export function incrementPaginate() {
	return {
		type: "INCREMENT_PAGINATE"
	}
}

export function decrementPaginate() {
	return {
		type: "DECREMENT_PAGINATE"
	}
}

export function updateTiger(name) {
	return {
		type: "UPDATE_TIGER",
		name
	}
}

export function resetFail() {
	return {
		type: "USER_FAILURE_HIDE"
	}
}

export function resetSuccess() {
	return {
		type: "USER_SUCCESS_HIDE"
	}
}