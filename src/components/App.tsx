import React from 'react';
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import NavBar from './NavBar';
import Complete from './authComps/Complete';
import Password from './authComps/Password';
import ResendEmail from './authComps/ResendEmail';
import Register from './authComps/Register';
import Signout from './authComps/Signout';
import Footer from './Footer';
import PassChange from './authComps/PassChange';
const Main = loadable(() => import('./Main'));
const Login = loadable(() => import('./authComps/Login'));

const App: React.FC = () => {
	return (
		<div className='App'>
			<div className='main'>
				<Browser>
					<NavBar />
					<Routes>
						<Route index element={<Main />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/complete' element={<Complete />} />
						<Route path='/password' element={<Password />} />
						<Route path='/signout' element={<Signout />} />
						<Route path='/passchange' element={<PassChange />} />
						<Route path='/resendmail' element={<ResendEmail />} />
						<Route
							path='/resendpassemail'
							element={<ResendEmail password={true} />}
						/>
					</Routes>
				</Browser>
			</div>
			<Footer />
		</div>
	);
};

export default App;
