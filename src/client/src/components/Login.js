import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import axios from 'axios';
import LoginField from './LoginField';
import ToJS from './ToJS';
import authFields from './authFields';

class Login extends Component {
	onLogin = async (values) => {
		const { email, password } = values;
		const msg = 'Fill this field';
		if (!email) {
			throw new SubmissionError({ email: msg });
		}
		if (!password) {
			throw new SubmissionError({ password: msg });
		}
		const res = await axios.post('/api/auth/signin', values);
		if (res.data.success) {
			localStorage.setItem('jwtToken', res.data.token);
			window.location.reload();
		}
	};

	renderFields = () => authFields
		.slice(-2)
		.map(({
			type, name, placeholder, label,
		}) => (
			<Field
				key={name}
				type={type}
				name={name}
				placeholder={placeholder}
				label={label}
				component={LoginField}
			/>
		));

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="row justify-content-md-center">
				<form
					className="form-signin col-lg-6"
					onSubmit={handleSubmit(this.onLogin)}
				>
					<h2 className="form-signin-heading">
						<span>Enter your credentials</span>
					</h2>
					<hr />
					{this.renderFields()}
					<button
						className="btn btn-lg btn-primary btn-block"
						type="submit"
					>
						<span>Login</span>
					</button>
					<p className="py-2">
						<span>Not a member?</span>
						{' '}
						<Link to="/signup" href="/signup">
							<span
								className="glyphicon glyphicon-plus-sign"
								aria-hidden="true"
							/>
							<span>Sign up here</span>
						</Link>
					</p>
				</form>
			</div>
		);
	}
}

const validate = () => {
	const errors = {};
	return errors;
};

const mapStateToProps = state => ({ form: state.get('form') });

const LoginHOC = connect(mapStateToProps)(ToJS(Login));

export default reduxForm({
	validate,
	form: 'signupForm',
})(LoginHOC);
