import React from 'react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import {
	useGetListofFilesQuery,
	useDeleteFileMutation,
	useUploadFilesMutation,
} from './RTKQueries/listQuery';
import './styles/Main.css';

const Main: React.FC = () => {
	const auth = useAppSelector(state => state.authReducer.auth);
	const [file, setFile] = useState<any>();
	const [skip, setSkip] = React.useState(true);
	const listResult = useGetListofFilesQuery(null, {
		skip,
	});
	const { data } = listResult;
	const [deleteFile] = useDeleteFileMutation();
	const [uploadFiles] = useUploadFilesMutation();

	const deleter = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		key: string,
	) => {
		e.stopPropagation();
		try {
			deleteFile(key);
		} catch (err) {
			console.log('failed to delete');
		}
	};

	useEffect(() => {
		if (auth) {
			setSkip(false);
		} else {
			setSkip(true);
		}
	}, [auth]);

	const renderlist = () => {
		if (!auth) {
			return <h3>Log in to save files</h3>;
		} else if (auth && data) {
			return data.list.Contents.map((item, index) => {
				return (
					<li className='fileitem single' key={index}>
						<a
							target='_blank'
							rel='noreferrer'
							href={`http://localhost:3093/download/${item.Key}`}>
							{item.Key}
						</a>
						<span
							className='delete'
							onClick={e => deleter(e, item.Key)}>
							X
						</span>
					</li>
				);
			});
		} else {
			return <li>Loading...</li>;
		}
	};

	const handleSubmit = async (
		e: React.MouseEvent | React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		if (file) {
			if (file[0].size > 5000000) {
				alert('Files cannot be bigger than 5MB');
				return;
			}

			const formData = new FormData();
			formData.append('file', file[0]);

			try {
				uploadFiles(formData);
				alert('success');
				e.target[0].value = '';
				setFile(undefined);
			} catch (err) {
				alert('Something went wrong');
				console.log(err);
			}
		} else {
			alert('No File selected');
		}
	};

	return (
		<main>
			<h1>Import a file to save into your drive!</h1>
			<form className='form' onSubmit={e => handleSubmit(e)}>
				{auth ? (
					<>
						<input
							className='input'
							type='file'
							id='file'
							name='file'
							onChange={e => setFile(e.target.files)}
						/>
						<button className='btn' type='submit'>
							Upload
						</button>
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
