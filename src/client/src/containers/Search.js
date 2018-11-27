import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class Search extends Component {
	static propTypes = {
		action: PropTypes.shape({}).isRequired,
	};

	state = { searchTerm: '' }

	onSearchChange = (e) => {
		const searchTerm = e.target.value;
		this.setState({ searchTerm });
		const { action } = this.props;
		setTimeout(() => {
			action.filterBooks(searchTerm);
		}, 100);
	};

	render() {
		const { searchTerm } = this.state;
		return (
			<div>
				<input
					type="text"
					name="search"
					placeholder="Search.."
					value={searchTerm}
					onChange={this.onSearchChange}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(actions, dispatch),
});

export default connect(
	null,
	mapDispatchToProps
)(Search);
