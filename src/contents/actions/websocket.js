import SockJS from 'sockjs-client';
import React from "react"

import * as actions from "./tigers/actions.js"
import store from "../store.js"

var sock = new SockJS('http://162.243.84.167:3000/chat');
sock.onopen = function() {
    //socket it ready
 };
 sock.onmessage = function(e) {
 	if (e.data == "false") {
 		store.dispatch({
	    	type: "USER_FAILURE_SHOW"
	    })
 	}
 	else {
	    let data = JSON.parse(e.data)
	    store.dispatch({
	    	type: "UPDATE_TIGER",
	    	name: data.name
	    })
	    store.dispatch({
	    	type: "USER_SUCCESS_SHOW"
	    })
	}
 };
 sock.onclose = function() {
     console.log('close');
 };

export default class SockHolder extends React.Component {
	getChildContext() {
		return {
			sock: sock
		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
			)
	}
}
SockHolder.childContextTypes = {
	sock: React.PropTypes.object
}