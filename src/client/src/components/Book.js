import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

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
		const { books } = this.props;
		const { current } = books;
		if (!current) return <div>Loading...</div>;
		const { title, cover, description } = current;
		return (
			<div>
				<h2>{title}</h2>
				<div>
					{cover && <img src={`https://cloud-cube-eu.s3.amazonaws.com/rnyd0htrxw60/public/${cover}`} alt="book cover" />}
				</div>
				<p>Description: {description}</p>
			</div>
		);
	}
}

Book.propTypes = {
	match: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
	books: state.get('books').toJS(),
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(actions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Book);
