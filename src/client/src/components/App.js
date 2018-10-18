import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';
import Library from './Library';
import ToJS from './ToJS';

class App extends Component {
	componentDidMount() {
		const { fetchUser } = this.props;
		fetchUser();
	}

	render() {
		const { user: { profile } } = this.props;
		const logIn = profile ? <Redirect to="/" /> : <Login />;
		const library = profile ? <Library /> : <Redirect to="/login" />;
		return (
			<Router>
				<div className="container">
					<Header />
					<Route exact path="/" component={Landing} />
					<Route path="/login" render={() => logIn} />
					<Route path="/signup" render={props => <SignUp {...props} />} />
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
