import React from "react"
import * as axios from "axios"

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';

export default class Reset extends React.Component {
	componentWillMount() {
		axios.get("http://162.243.84.167:3000/auth").then((data) => {
			if (!data.data) {
				this.context.history.pushState(null, "/login")
			}
		})
	}
	constructor() {
		super()
		this.state = {
			value: "",
			nameOpen: false,
			nameOpen1: false,
			nameOpen2: false
		}
	}
	submit() {
		if (this.state.value) {
			let request = axios.get("http://162.243.84.167:3000/reset?word=" + this.state.value)
			request.then(() => {
				this.setState({
					nameOpen1: true
				})
			})
			.catch(() => {
				this.setState({
					nameOpen2: true
				})
			})
		} else {
			this.setState({
				nameOpen: true
			})
		}
	}
	handleRequestClose = () => {
	    this.setState({
	      nameOpen: false,
	    });
	  };
	handleRequestClose1 = () => {
	    this.setState({
	      nameOpen1: false,
	    });
	  };
	handleRequestClose2 = () => {
	    this.setState({
	      nameOpen2: false,
	    });
	  };
	render() {
		return (
			<div style={{textAlign: "center"}}>
				<Snackbar
		          open={this.state.nameOpen}
		          message="Please enter a word of the day"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose}
		        />
		        <Snackbar
		          open={this.state.nameOpen1}
		          message="The tigers were reset"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose1}
		        />
		        <Snackbar
		          open={this.state.nameOpen2}
		          message="The tigers were not reset"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose2}
		        />
				<TextField
			      floatingLabelText="New word of the day..."
			      value={this.state.value}
			      onChange={(e) =>{
			      	this.setState({
			      		value: e.target.value
			      	})
			      }}
			    /><br/>
			    <RaisedButton label="Reset" primary={true} style={{marginBottom: "10px"}} onClick={this.submit.bind(this)} />
			</div>
			)
	}
}
Reset.contextTypes = {
	history: React.PropTypes.object
}