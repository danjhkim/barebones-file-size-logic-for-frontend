import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className='nav'>
			<NavLink to='/'>Main</NavLink>
			<NavLink to='/test'>TEST</NavLink>
		</nav>
	);
};

export default NavBar;
