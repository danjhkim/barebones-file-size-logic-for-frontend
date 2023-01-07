import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { signOut } from '../../slices/signUpSlice';
import { logOut } from '../../slices/authSlice';

const Signout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(signOut());
		dispatch(logOut());
	}, [dispatch]);

	return <div>Sorry to see you go</div>;
};

export default Signout;
