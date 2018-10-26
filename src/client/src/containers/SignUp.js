import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import { connect } from 'react-redux';
import axios from 'axios';

import { FormField } from '../components';
import { authFields, validateEmail } from '../utilities';

class SignUp extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
	}

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
		}
	};

	renderFields = () => authFields.map(({
		type, name, placeholder, label,
	}) => (
		<Field
			key={name}
			type={type}
			name={name}
			placeholder={placeholder}
			label={label}
			component={FormField}
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

const validate = () => {
	const errors = {};
	return errors;
};

const mapStateToProps = state => ({ form: state.get('form') });

const SignUpHOC = connect(mapStateToProps)(SignUp);

export default reduxForm({
	validate,
	form: 'signupForm',
})(SignUpHOC);
