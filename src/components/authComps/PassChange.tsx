import { useAppSelector } from '../../hooks';
import ChangePass from '../Form/ChangePass';

const PassChange: React.FC = () => {
	const auth = useAppSelector(state => state.authReducer.auth);

	return <div>{auth ? <ChangePass /> : null}</div>;
};

export default PassChange;
