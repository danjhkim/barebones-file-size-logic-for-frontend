import { useEffect, useState } from 'react';

const Main = () => {
	const [file, setFile] = useState(undefined);
	const [list, setList] = useState([]);
	const [auth, setAuth] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		setLoading(true);
		e.preventDefault();
		if (file) {
			if (file[0].size > 5000000) {
				alert('Files cannot be bigger than 5MB');
				return;
			}

			const formData = new FormData();
			formData.append('file', file[0]);

			try {
				let postData = await fetch('http://localhost:3093/upload', {
					method: 'post',
					body: formData,
				});

				let res = await postData.json();

				if (res.status === 200) {
					alert('success');
					console.log(res);
					e.target[0].value = '';
					setFile(undefined);
					setLoading(false);
				}
			} catch (err) {
				alert('Something went wrong');
				console.log(err);
				setLoading(false);
			}
		} else {
			alert('No File selected');
			setLoading(false);
		}
	};

	//! this should fetch list of files from backend
	useEffect(() => {
		(async () => {
			let res = await fetch('http://localhost:3093/list');
			let data = await res.json();

			let list = await data.list.Contents;

			setList(list);
		})();
	}, []);

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
						{console.log(item.Key)}
						<a
							target='_blank'
							rel='noreferrer'
							href={`http://localhost:3093/download/${item.Key}`}>
							{item.Key}
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
