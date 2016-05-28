import React from "react"
import { connect } from "react-redux"
import * as _ from "lodash"

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Check from 'material-ui/lib/svg-icons/navigation/check';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import CircularProgress from 'material-ui/lib/circular-progress';
import Snackbar from 'material-ui/lib/snackbar';
import TextField from 'material-ui/lib/text-field';

import * as actions from "../../actions/tigers/actions.js"

class HiddenTiger extends React.Component {
	componentDidMount() {
		this.props.updateTigers()
	}
	filterChange(e) {
		this.props.updateFilter(e.target.value)
	}
	render() {
		return (
			<div>
				<div style={{"textAlign": "center"}}>
					<TextField
			    	  floatingLabelText="Search..."
			    	  value={this.props.filter}
			    	  onChange={this.filterChange.bind(this)}
			    	/>
			    	{this.props.zeroItems? <div><br/>There are no search results</div> : <div></div>}
			    </div>
				<Snackbar
					open={this.props.error}
					message="The Tiger Links could not be loaded"
					autoHideDuration={4000}
					onRequestClose={(request: "timeout") => {null}}
				/>
				<div style={{"textAlign": "center"}}>
					{this.props.loading? <CircularProgress size={1.5} /> : <div></div>}
				</div>
				<List>
					{this.props.tigers.map((item) => {
						return (
							<ListItem key={item.id} primaryText={item.name} rightIcon={item.value == 0? <Clear style={{fill: "red"}} /> : <Check style={{fill: "green"}} />} />
							)
					})}
				</List>
				<div class="container1">
				  <div class="pagination">
				  	<span onClick={() => {
				  		if (this.props.pagNum > 0) {
				  			this.props.decrementPaginate()
				  		}
				  	}}>&lt;</span>
				  	{this.props.pagLength.length == 0? <span class="active">1</span> : <div style={{display: "none"}}></div>}
				    {this.props.pagLength.map((item) => {
				    	return (
				    			<span key={item} onClick={() => {
				    				this.props.updatePaginate(item + 1)
				    			}}
				    			class={item == this.props.pagNum? "active" : ""}>{item + 1}</span>
				    		)
				    })}
				    <span onClick={() => {
				    	if (this.props.pagLength.length > this.props.pagNum + 1) {
				    		this.props.incrementPaginate()
				    	}
				    }}>&gt;</span>
				  </div>
				</div>
			</div>
			)
	}
}

const Tiger = connect(
	(state) => {
		var filteredTigers = _.filter(state.tigers, (item) => {
			return item.name.indexOf(state.tigersFilter) > -1;
		})
		let zeroItems = false
		if (filteredTigers.length == 0) {
			zeroItems = true
		}

		var groupSize = 10;
		var groups = _.map(filteredTigers, function(item, index) {
			return index % groupSize === 0 ? filteredTigers.slice(index, index + groupSize) : null;
		}).filter(function(item) {
			return item;
		});
		let pagNum = state.paginate - 1
		let paginatedTiger = groups[pagNum]
		paginatedTiger = ( typeof paginatedTiger != 'undefined' && paginatedTiger instanceof Array ) ? paginatedTiger : []
		var N = groups.length; 
		let pagLength = Array.apply(null, {length: N}).map(Number.call, Number)
		return {
			tigers: paginatedTiger,
			loading: state.tigersLoading,
			error: state.tigersError,
			filter: state.tigersFilter,
			pagLength,
			zeroItems,
			pagNum
		}
	},
	(dispatch) => {
		return {
			updateTigers: () => {
				dispatch(actions.tigersLoading())
				dispatch(actions.updateTigers())
			},
			updateFilter: (filter) => {
				dispatch(actions.updateFilter(filter))
				dispatch(actions.changePaginate(1))
			},
			updatePaginate: (paginate) => {
				dispatch(actions.changePaginate(paginate))
			},
			incrementPaginate: () => {
				dispatch(actions.incrementPaginate())
			},
			decrementPaginate: () => {
				dispatch(actions.decrementPaginate())
			}
		}
	}
	)(HiddenTiger)

export default Tiger