import '../styles/App.css';
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from './Login';
import SignUp from './SignUp';
import Library from './Library';
import Book from '../components/Book';
import { Header, Landing } from '../components';
import * as actions from '../actions';

class App extends Component {
	componentDidMount() {
		const { action } = this.props;
		action.fetchUser();
		console.log(this.props);
	}

	render() {
		const {
			user,
			user: { profile },
			books,
			action,
		} = this.props;
		const logIn = profile ? <Redirect to="/" /> : <Login />;
		const library = profile ? (
			<Library action={action} user={user} books={books} />
		) : (
			<Redirect to="/login" />
		);
		return (
			<Router>
				<div className="container">
					<Header user={user} />
					<Switch>
						<Route path="/library" render={() => library} />
						<Route path="/login" render={() => logIn} />
						<Route
							path="/signup"
							render={props => <SignUp {...props} />}
						/>
						<Route path="/:id/:book" component={Book} />
						<Route path="/" component={Landing} />
					</Switch>
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
