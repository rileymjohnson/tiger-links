import { combineReducers } from "redux"

import tigersReducer from "./tiger/tigers.js"
import tigerLoadingReducer from "./tiger/loading.js"
import tigersErrorReducer from "./tiger/error.js"
import tigersFilterReducer from "./tiger/filter.js"
import paginateReducer from "./tiger/paginate.js"
import addedReducer from "./tiger/added.js"
import successReducer from "./tiger/success.js"
import failureReducer from "./tiger/failure.js"

const mainReducer = combineReducers({
	tigers: tigersReducer,
	tigersLoading: tigerLoadingReducer,
	tigersError: tigersErrorReducer,
	tigersFilter: tigersFilterReducer,
	paginate: paginateReducer,
	success: successReducer,
	failure: failureReducer
})

export default mainReducer