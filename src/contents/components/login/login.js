import React from "react"
import * as axios from "axios"

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';

export default class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			password: ""
		}
	}
	submit() {
		axios.post("http://162.243.84.167:3000/auth", {password: this.state.password}).then((data) => {
			console.log(data);
		})
	}
	render() {
		return (
			<div style={{textAlign: "center"}}>
				<TextField
			      floatingLabelText="Password..."
			      type="password"
			      value={this.state.password}
			      onChange={(e) => {
			      	this.setState({
			      		password: e.target.value
			      	})
			      }}
			    /><br/>
			    <RaisedButton label="Submit" primary={true} style={{marginBottom: "10px"}} onClick={this.submit.bind(this)} />
			</div>
			)
	}
}