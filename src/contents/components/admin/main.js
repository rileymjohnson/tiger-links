import React from "react"
import { connect } from "react-redux"

import * as actions from "../../actions/tigers/actions.js"

import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import LinearProgress from 'material-ui/lib/linear-progress';

class HiddenSignin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			name: "",
			open: false,
			nameOpen: false,
			nameOpen1: false,
			nameOpen2: false,
			successToast: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.success) {
			this.setState({
				value: 0,
				name: ""
			})
		}
		this.setState({
			nameOpen1: nextProps.failure,
			nameOpen2: nextProps.success
		})
	}
	componentDidMount() {
		this.props.updateTigers()
	}
	handleRequestClose = () => {
	    this.setState({
	      open: false,
	    });
	  };
	  handleRequestCloseName = () => {
	    this.setState({
	      nameOpen: false,
	    });
	  };
	  handleRequestCloseName1 = () => {
	    this.setState({
	      nameOpen1: false,
	    });
	  };
	  handleRequestCloseName2 = () => {
	    this.setState({
	      nameOpen2: false,
	    });
	  };
	updateName(e) {
		this.setState({
			name: e.target.value
		})
	}
	submit() {
		this.props.resetFail()
		this.props.resetSuccess()
		if (this.state.name) {
			if (this.state.value != 0) {
				let message = JSON.stringify({
					word: this.state.name,
					name: this.state.value
				})
				this.context.sock.send(message)
			} else {
				this.setState({
					nameOpen: true
				})
			}
		} else {
			this.setState({
				open: true
			})
		}
	}
	handleChange = (event, index, value) => this.setState({value});
	render() {
		return (
				<div style={{"textAlign": "center"}}>
				<Snackbar
		          open={this.state.nameOpen1}
		          message="The word of the day is not correct"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestCloseName1}
		        />
		        <Snackbar
		          open={this.state.nameOpen2}
		          message="You were successfully signed in"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestCloseName2}
		        />
				<Snackbar
		          open={this.state.open}
		          message="Please enter the word of the day"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose}
		        />
		        <Snackbar
		          open={this.state.nameOpen}
		          message="Please pick your name"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestCloseName}
		        />
		        <Snackbar
					open={this.props.error}
					message="The Tiger Links could not be loaded"
					autoHideDuration={4000}
					onRequestClose={(request: "timeout") => {null}}
				/>
				<Snackbar
					open={this.state.successToast}
					message="You were successfully signed in"
					autoHideDuration={4000}
					onRequestClose={(request: "timeout") => {null}}
				/>
				<h3>Sign In</h3>
				<TextField
			      floatingLabelText="Word of the Day"
			      value={this.state.name}
			      onChange={this.updateName.bind(this)}
			    /><br/>
			    <SelectField maxHeight={300} value={this.state.value} onChange={this.handleChange} ref="tigers">
				  <MenuItem value={0} primaryText="Pick your name"/>
				  {this.props.tigers.map((item) => {
				  	return (
				  		<MenuItem value={item.id} key={item.id} primaryText={item.name}/>
				  		)
				  })}		       	
			    </SelectField><br/>
			    {this.props.loading? <LinearProgress mode="indeterminate" style={{width: "256px", "margin": "0 auto"}} /> : <div></div>}
			    <RaisedButton label="Submit" primary={true} style={{"margin": "10px"}} onClick={this.submit.bind(this)} />
				</div>
			)
	}
}
HiddenSignin.contextTypes = {
	sock: React.PropTypes.object
}

const Signin = connect(
	(state) => {
		return {
			tigers: state.tigers,
			loading: state.tigersLoading,
			error: state.tigersError,
			failure: state.failure,
			success: state.success
		}
	},
	(dispatch) => {
		return {
			updateTigers: () => {
				dispatch(actions.tigersLoading())
				dispatch(actions.updateTigers())
			},
			resetFail: () => {
				dispatch(actions.resetFail())
			},
			resetSuccess: () => {
				dispatch(actions.resetSuccess())
			}
		}
	}
	)(HiddenSignin)

export default Signin