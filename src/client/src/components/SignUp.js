import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import { connect } from 'react-redux';
import axios from 'axios';
import ToJS from './ToJS';
import SignUpField from './SignUpField';
import fields from './fields';
import validateEmail from '../validateEmail';

class SignUp extends Component {
	onSignUp = async (values) => {
		const { history } = this.props;
		const msg = 'Fill this field';
		const invalidEmail = validateEmail(values.email || '');
		if (!values.password) {
			throw new SubmissionError({ password: msg });
		}
		if (!values.email) {
			throw new SubmissionError({ email: msg });
		} if (invalidEmail) {
			throw new SubmissionError({ email: 'Not valid email.' });
		}
		const res = await axios.post('/api/auth/signup', values);
		if (res.data.success) {
			history.push('/signin');
		} else {
			console.log(res.data.info);
		}
	};

	renderFields = () => fields.map(({
		type, name, placeholder, label,
	}) => (
		<Field
			key={name}
			type={type}
			name={name}
			placeholder={placeholder}
			label={label}
			component={SignUpField}
		/>
	));

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="container">
				<div className="row justify-content-md-center">
					<form
						className="form-signin col-lg-6"
						onSubmit={handleSubmit(this.onSignUp)}
					>
						<h2 className="form-signin-heading">
							<span>SignUp</span>
						</h2>
						<p>Please fill in this form to create an account.</p>
						<hr />
						{this.renderFields()}
						<button
							className="btn btn-lg btn-primary btn-block"
							type="submit"
						>
							<span>Sign up</span>
						</button>
					</form>
				</div>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	// errors.email = validateEmail(values.email || '');
	// fields.forEach(({ name }) => {
	// 	if (!values[name]) {
	// 		errors[name] = '';
	// 	}
	// });

	return errors;
};

const mapStateToProps = state => ({ form: state.get('form') });

const SignUpHOC = connect(mapStateToProps)(ToJS(SignUp));

export default reduxForm({
	validate,
	form: 'signupForm',
})(SignUpHOC);
