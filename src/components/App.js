import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom';
import Main from './Main';
import NavBar from './NavBar';
import Test from './Test';
function App() {
	return (
		<div className='App'>
			<Browser>
				<NavBar />
				<Routes>
					<Route index element={<Main />} />
					<Route path='/test' element={<Test />} />
				</Routes>
			</Browser>
		</div>
	);
}

export default App;
