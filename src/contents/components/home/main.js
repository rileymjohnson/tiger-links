import React from "react"
import { Link } from "react-router"

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Settings from 'material-ui/lib/svg-icons/action/settings';

export default class Home extends React.Component {
	render() {
		const linkStyles = {
			color: "black",
			"textDecoration": "none"
		}
		return (
			<div>
				<List>
					<Link to="/admin" style={linkStyles}>
						<ListItem leftIcon={<ActionGrade />} >
							Tiger Links
						</ListItem>
					</Link>
					<Link to="/signin" style={linkStyles}>
						<ListItem leftIcon={<ActionGrade />} >
							Sign in
						</ListItem>
					</Link>
					<Link to="/reset" style={linkStyles}>
						<ListItem leftIcon={<Settings />} >
							Admin
						</ListItem>
					</Link>
				</List>
			</div>
			)
	}
}