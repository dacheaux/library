import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ToJS from './ToJS';

class SignIn extends Component {
	state = { email: '', password: '', message: '' };

	onChange = (e) => {
		const state = { ...this.state };
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onSignIn = async (e) => {
		e.preventDefault();

		const { email, password } = this.state;
		const res = await axios.post('/api/auth/signin', { email, password });
		if (res.data.success) {
			localStorage.setItem('jwtToken', res.data.token);
			window.location.reload();
		}
	};

	render() {
		const { email, password, message } = this.state;
		return (
			<div className="container">
				<form className="form-signin" onSubmit={this.onSignIn}>
					{message !== '' && (
						<div
							className="alert alert-warning alert-dismissible"
							role="alert"
						>
							{message}
						</div>
					)}
					<h2 className="form-signin-heading">
						<span>Enter your credentials</span>
					</h2>
					<input
						type="email"
						className="form-control"
						placeholder="Email address"
						name="email"
						value={email}
						onChange={this.onChange}
						required
					/>
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						name="password"
						value={password}
						onChange={this.onChange}
						required
					/>
					<button
						className="btn btn-lg btn-primary btn-block"
						type="submit"
					>
						<span>Login</span>
					</button>
					<p>
						<span>Not a member?</span>{' '}
						<Link to="/register" href="/register">
							<span
								className="glyphicon glyphicon-plus-sign"
								aria-hidden="true"
							/>
							<span>Register here</span>
						</Link>
					</p>
				</form>
			</div>
		);
	}
}

export default ToJS(SignIn);
