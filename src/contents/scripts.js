import React from "react"
import ReactDom from "react-dom"
import {Router, Route, IndexRoute, Redirect, hashHistory} from "react-router" //router stuff and dev history
import createBrowserHistory from 'history/lib/createBrowserHistory' //use this for actual history
import { Provider } from "react-redux"
import injectTapEventPlugin from "react-tap-event-plugin" //fixes touch event for material ui
injectTapEventPlugin(); //click fix

import Layout from "./containers/layout.js"
import store from "./store.js"

import Home from "./components/home/main.js"
import Tiger from "./components/tiger/main.js"
import Signin from "./components/admin/main.js"
import Reset from "./components/reset/main.js"
import Login from "./components/login/login.js"

import SockHolder from "./actions/websocket.js"
import mainReducer from "./reducers/reducer.js"

//creates the render point for react
const app = document.getElementById('app');

ReactDom.render(
	<Provider store={store}>
		<SockHolder>
		<Router history={hashHistory}>
			<Route component={Layout} path="/">
				<IndexRoute component={Home} />
				<Route path="/signin" component={Signin} />
				<Route path="/admin" component={Tiger} />
				<Route path="/reset" component={Reset} />
				<Route path="/login" component={Login} />
			</Route>
		</Router>
		</SockHolder>
	</Provider>
	, app);