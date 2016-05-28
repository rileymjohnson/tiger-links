import React from "react"
import { Link } from "react-router"

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}
	handleToggle() {
		this.setState({open: !this.state.open})
	}
	render() {
		const linkStyles = {
			color: "black",
			"textDecoration": "none"
		}
		return (
			<div>
				<AppBar
					title="Tiger Links"
					onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
				/>
				<LeftNav
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={open => this.setState({open})}
				>
					<Link to="/" style={linkStyles}><MenuItem>Home</MenuItem></Link>
					<Link to="/admin" style={linkStyles}><MenuItem>Admin</MenuItem></Link>
					<Link to="/signin" style={linkStyles}><MenuItem>Sign in</MenuItem></Link>
					<Link to="/reset" style={linkStyles}><MenuItem>Reset</MenuItem></Link>
				</LeftNav>
				<Paper style={{"marginTop": "20px"}} class="container" zDepth={3}>
					{this.props.children}
				</Paper>
			</div>
			)
	}
}