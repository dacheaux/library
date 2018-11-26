import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import publicFolder from '../constants';

// const importAll = (r) => {
// 	const images = {};
// 	r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
// 	return images;
// };
// const images = importAll(require.context('../files', false, /\.(png|jpe?g|svg)$/));

class Book extends Component {
	componentDidMount() {
		const { action, match } = this.props;
		action.fetchBookById(match.params.id);
	}

	render() {
		const { user, books } = this.props;
		const { current } = books;
		if (!current) return <div>Loading...</div>;
		const { title, cover, description } = current;
		return (
			<div>
				{ user && <Link to="/library/edit-book/values" href="/library/edit-book/values">Edit...</Link> }
				<h2 className="text-center mb-4">{title}</h2>
				<div className="text-center">
					{<img src={`${publicFolder}${cover}`} alt="book cover" className="w-50" />}
				</div>
				<p className="mt-4">{description}</p>
			</div>
		);
	}
}

Book.propTypes = {
	match: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
	user: state.get('user').toJS(),
	books: state.get('books').toJS(),
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(actions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Book);
