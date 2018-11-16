import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
	static propTypes = {
		user: PropTypes.shape({}).isRequired,
	};

	onLogout = () => {
		localStorage.removeItem('jwtToken');
		window.location.reload();
	};

	renderContent() {
		const {
			user: { profile },
		} = this.props;
		switch (profile) {
		case false:
			return [
				<li key="1">
					<Link to="/login" href="/login" className="menu">
						<span>Login</span>
					</Link>
				</li>,
				<li key="2">
					<Link to="/signup" href="/signup" className="menu">
						<span>Sign up</span>
					</Link>
				</li>,
			];
		default:
			return [
				<li key="1" style={{ margin: '0 10px' }}>
					<span>User: </span>
					<span>{profile.email}</span>
				</li>,
				<li key="2">
					<a href="/" onClick={this.onLogout}>
						<span>Logout</span>
					</a>
				</li>,
			];
		}
	}

	render() {
		const user = this.props;
		return (
			<div className="row justify-content-between py-2">
				<nav className="nav-wrapper">
					<Link to="/" href="/" className="menu">
						<span>Home</span>
					</Link>
					<Link to={user ? '/library' : '/signin'} href={user ? '/library' : '/signin'} className="menu">
						<span>Library</span>
					</Link>
				</nav>
				<ul className="nav-right d-flex">{this.renderContent()}</ul>
			</div>
		);
	}
}

export default Header;
