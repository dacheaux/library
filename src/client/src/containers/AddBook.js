import React, { Component } from 'react';
import axios from 'axios';
import { bookFields } from '../utilities';

class AddBook extends Component {
	state = {
		title: '',
		author: '',
		genre: '',
		description: '',
		error: '',
		selectedFile: null,
		loaded: 0,
	};

	onChange = (e) => {
		const state = { ...this.state };
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	renderBookFields = () => bookFields.map(({ name, placeholder }) => {
		const { [name]: value } = this.state;
		return (
			<div key={name} className="container form-group my-4">
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
		this.setState({
			selectedFile: e.target.files[0],
			loaded: 0,
		});
	}

	handleUpload = () => {
		const { selectedFile } = this.state;
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
	}

	onAddBook = async (e) => {
		e.preventDefault();

		const {
			title, author, genre, description,
		} = this.state;
		const {
			user: { profile },
			action,
		} = this.props;
		action.addBook({
			title,
			author,
			genre,
			description,
			userId: profile.id,
		});
		this.setState({
			title: '',
			author: '',
			genre: '',
			description: '',
		});
	};

	render() {
		return (
			<div className="mb-5">
				<form className="row" onSubmit={this.onAddBook}>
					<div className="col-lg-6 px-0 mr-auto">
						<h3>
							<span>Add new book to library</span>
						</h3>
						{this.renderBookFields()}
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
					<div className="upload">
						<input type="file" name="" id="" onChange={this.handleSelectedFile} />
						<button type="button" onClick={this.handleUpload}>Upload</button>
						<div> {Math.round(this.state.loaded, 2) } %</div>
					</div>
					<button className="col-3 btn btn-info btn-block" type="submit">
						<span>Add book</span>
					</button>
					<p>
						<span>{this.state.error}</span>
					</p>
				</form>
			</div>
		);
	}
}

export default AddBook;
