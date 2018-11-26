import React, { Component } from 'react';
import axios from 'axios';
import { bookFields } from '../utilities';

class EditBook extends Component {
	state = {
		id: null,
		title: '',
		author: '',
		genre: '',
		description: '',
		cover: '',
		error: '',
		selectedFile: null,
		loaded: 0,
	};

	componentDidMount() {
		const { list, match } = this.props;
		if (match) {
			const { params } = match;
			const bookId = parseInt(params.id, 10);
			const current = list.find(book => book.id === bookId);
			this.setState(current);
		}
	}

	onChange = (e) => {
		const state = { ...this.state };
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	renderBookFields = () => bookFields.map(({ name, placeholder }) => {
		const { [name]: value } = this.state;
		return (
			<div key={name} className="form-group my-4">
				<label htmlFor={name} className="row py-2 text-capitalize">
					<span className="col-md-3 pl-4">{name}</span>
					<input
						id={name}
						name={name}
						type="text"
						value={value}
						onChange={this.onChange}
						placeholder={placeholder}
						className="col-md-8 form-control"
					/>
				</label>
			</div>
		);
	});

	handleSelectedFile = (e) => {
		const selectedFile = e.target.files[0];
		const data = new FormData();
		data.append('file', selectedFile, selectedFile.name);
		axios
			.post('/api/user/upload', data, {
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
					});
				},
			})
			.then((res) => {
				console.log(res.statusText);
			});
		this.setState({
			selectedFile,
			loaded: 0,
			cover: selectedFile.name,
		});
	}

	onSaveBook = async (e) => {
		e.preventDefault();

		const {
			error, selectedFile, loaded, ...book
		} = this.state;
		const {
			user: { profile },
			action,
		} = this.props;
		action.saveBook({
			...book,
			userId: profile.id,
		});
		this.setState({
			title: '',
			author: '',
			genre: '',
			description: '',
			cover: '',
		});
	};

	render() {
		return (
			<div className="mb-5">
				<form className="row" onSubmit={this.onSaveBook}>
					<div className="col-lg-6 px-0 mr-auto">
						<h3>
							<span>Add new book to library</span>
						</h3>
						{this.renderBookFields()}
						<div className="row">
							<div className="custom-file col-md-6 ml-4">
								<label className="custom-file-label" htmlFor="customFile">
									<span>Choose book cover</span>
									<input
										className="custom-file-input"
										type="file"
										name="file"
										id="customFile"
										onChange={this.handleSelectedFile}
									/>
								</label>
							</div>
							<div className="col-md-4"> {Math.round(this.state.loaded, 2) } %</div>
						</div>
					</div>
					<div className="col-lg-6 px-0 mr-auto">
						<div className="form-group my-4">
							<label htmlFor="description" className="row py-2 text-capitalize">
								<span className="pl-4">Description</span>
								<textarea
									id="description"
									name="description"
									value={this.state.description}
									rows={10}
									onChange={this.onChange}
									placeholder="Write about book here"
									className="mx-4 my-2 form-control"
								/>
							</label>
						</div>
					</div>
					<button className="col-3 btn btn-info btn-block" type="submit">
						<span>Save book</span>
					</button>
					<p>
						<span>{this.state.error}</span>
					</p>
				</form>
			</div>
		);
	}
}

export default EditBook;
