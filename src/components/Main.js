import { useEffect, useState } from 'react';

const Main = () => {
	const [file, setFile] = useState(undefined);
	const [list, setList] = useState(['kitty', 'dog', 'mushroom', 'human']);
	const [auth, setAuth] = useState(true);

	const handleSubmit = async e => {
		e.preventDefault();
		if (file) {
			if (file[0].size > 5000000) {
				alert('Files cannot be bigger than 5MB');
				return;
			}

			let postData = await fetch('https://api.github.com/gists', {
				method: 'post',
				body: file[0],
			});

			let res = await postData.json();

			if (res.statusCode === 200) {
				alert('success');
				console.log(res);
				e.target[0].value = '';
				setFile(undefined);
			} else {
				alert('Something went wrong');
				console.log(res);
			}
		} else {
			alert('No File selected');
		}
	};

	//! this should fetch list of files from backend
	// useEffect(() => {
	// 	(async () => {
	// 		let res = await fetch('https://api.github.com/gists');
	// 		let data = await res.json();
	// 		setList(data);
	// 	})();
	// }, []);

	//! this should try to authenticate immediately to see if web token or cookie exists to login
	// useEffect(() => {
	// 	(async () => {
	// 		let res = await fetch('https://api.github.com/gists/auth');
	// 		let data = await res.json();

	// 		if (data.res === true) {
	// 			setAuth(true);
	// 		}
	// 	})();
	// }, []);

	const renderlist = () => {
		if (!auth) {
			return <li>Log in to save files</li>;
		} else if (auth && list.length) {
			return list.map((item, index) => {
				return (
					<li className='fileitem' key={index}>
						<a
							target='_blank'
							rel='noreferrer'
							href={`https://dfdjfdfdf/${item}`}>
							{item}
						</a>
					</li>
				);
			});
		} else {
			return <li>Loading...</li>;
		}
	};

	return (
		<main>
			<h1>Import a file to save into your drive!</h1>
			<form onSubmit={e => handleSubmit(e)}>
				{auth ? (
					<>
						<input
							type='file'
							id='file'
							name='file'
							onChange={e => setFile(e.target.files)}
						/>
						<button type='submit'>Upload</button>
					</>
				) : null}
			</form>

			<div className='filelist'>
				<ul className='listitems'>{renderlist()}</ul>
			</div>
		</main>
	);
};

export default Main;
