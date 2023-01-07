import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { checkAuth } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import logo from '../images/logo.png';
import './styles/NavBar.css';

const NavBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const auth = useAppSelector(state => state.authReducer.auth);

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<nav className='nav'>
			<div className='logo'>
				<img src={logo} alt='logo' width={88} height={88} />
				<h1>Dan Filestore</h1>
			</div>
			<NavLink to='/'>Main</NavLink>
			{auth ? (
				<NavLink to='/signout'>Sign Out</NavLink>
			) : (
				<>
					<NavLink to='/login'>Login</NavLink>
					<NavLink to='/register'>Sign up</NavLink>
				</>
			)}
		</nav>
	);
};

export default React.memo(NavBar);
