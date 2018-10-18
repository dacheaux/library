import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import SignIn from './SignIn';
import Register from './Register';
import Library from './Library';
import ToJS from './ToJS';

class App extends Component {
	componentDidMount() {
		const { fetchUser } = this.props;
		fetchUser();
	}

	render() {
		const { user: { profile } } = this.props;
		const signIn = profile ? <Redirect to="/" /> : <SignIn />;
		const library = profile ? <Library /> : <Redirect to="/signin" />;
		return (
			<Router>
				<div className="container">
					<Header />
					<Route exact path="/" component={Landing} />
					<Route path="/signin" render={() => signIn} />
					<Route path="/signup" render={props => <Register {...props} />} />
					<Route path="/library" render={() => library} />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({ user: state.get('user') });

export default connect(
	mapStateToProps,
	actions
)(ToJS(App));
