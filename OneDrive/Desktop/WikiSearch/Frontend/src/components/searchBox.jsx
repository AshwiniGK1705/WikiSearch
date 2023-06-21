import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './searchbox.css';

const SearchBox = () => {
	//----State variable declaration-------
	const [search, setSearch] = useState('');
	const [results, setResult] = useState([]);

	//------------To handle input search---------
	const handleOnChange = (e) => {
		let searchData = e.target.value;

		if (searchData !== '') {
			setSearch(searchData);
		} else if (searchData === '' && results.length < 0) {
			alert('Please enter a string to search');
		}
	};
   //----------To handle search button click---------- 
	const handleOnClick = (e) => {
            return (search === '' && results.length === 0) ? alert('Please enter a string to search') : ''
			 
	}
   //------To handle successful button click with search input----------	
	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.get(`http://localhost:8000`, { params: { search } })
			.then((response) => {
				setResult(response.data);
			});
		setSearch('');
	};

	return (
		<div className='root'>
			<h1 className='heading'>Wikipedia Search Engine</h1>
			<div className="mt-20 container">
				<form onSubmit={submitHandler}>
						<input
							type="text"
							value={search}
							onChange={handleOnChange}
							className="mt-20 border border-2 p-2 m-2 searchbox"
							placeholder='Enter a string to search'
						/>
					<button
						className="bg-blue-300 p-2 text-black"
						type="submit"
					    onClick={handleOnClick}
					>
						Search
					</button>
				</form>
			</div>
			{results.length > 0
				? results.map((result, index) => (
						<div key={index} className="flex justify-center">
							<div className="flex bg-white shadow-lg border border-2">
								<div className="justify-start">
									<h5 className="text-gray-900 text-xl font-medium mb-2">
										{result.title}
									</h5>
									<p><a href={`https://en.wikipedia.org/wiki/${result.title}`}>{result.title}</a> </p>
									
									<p className="text-gray-700 text-base mb-4"
										dangerouslySetInnerHTML={{
												__html: 
													result.snippet					
											}}
										
									></p>
								</div>
							</div>
						</div>
				  ))
				: null}
		</div>
	);
};

export default SearchBox;