import { useAppSelector } from '../../hooks';

interface Prompt {
	title?: String;
	data?: String;
}

const Complete: React.FC<Prompt> = ({ title, data }) => {
	const auth = useAppSelector(state => state.authReducer.auth);
	return (
		<div>
			{auth ? (
				<>
					<h2>{title}</h2>
					<p>{data}</p>
				</>
			) : null}
		</div>
	);
};

Complete.defaultProps = {
	title: 'Your account has been verified!',
	data: 'You are now able to use your account. Please read about our terms and services.',
};

export default Complete;
