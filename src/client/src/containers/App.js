import '../styles/App.css';
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from './Login';
import SignUp from './SignUp';
import Library from './Library';
import { Header, Landing } from '../components';
import * as actions from '../actions';

class App extends Component {
	componentDidMount() {
		const { action } = this.props;
		action.fetchUser();
		action.fetchBooks();
	}

	render() {
		const {
			user,
			user: { profile },
			books,
			action,
		} = this.props;
		const logIn = profile ? <Redirect to="/library" /> : <Login />;
		return (
			<Router>
				<div className="container">
					<Header user={user} />
					<Route path="/login" render={() => logIn} />
					<Route
						path="/signup"
						render={props => <SignUp {...props} />}
					/>
					<Route path="/library" render={props => <Library {...props} action={action} user={user} books={books} />} />
					<Route exact path="/" render={() => <Landing books={books} />} />
				</div>
			</Router>
		);
	}
}

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
)(App);
