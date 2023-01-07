import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { clearStatus } from '../../slices/signUpSlice';
import { useAppDispatch } from '../../hooks';
import '../styles/Modal.css';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

interface Modalprops {
	title?: string;
	mainText?: string;
	secondaryText?: string;
}

const ModalComp: React.FC<Modalprops> = ({
	title,
	mainText,
	secondaryText,
}) => {
	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState<Boolean>(true);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		let timer = setTimeout(() => {
			navigate('/');
			dispatch(clearStatus());
			setIsOpen(false);
		}, 10000);

		return () => {
			clearTimeout(timer);
			dispatch(clearStatus());
			setIsOpen(false);
			navigate('/');
		};
	}, [navigate, dispatch]);

	function afterOpenModal() {
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
		navigate('/');
		dispatch(clearStatus());
	}

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Modal'>
				<h2 ref={_subtitle => (subtitle = _subtitle)}>{title}</h2>
				<div>
					<p>{mainText}</p>
					<p>{secondaryText}</p>
				</div>
				<button className='closeModal' onClick={closeModal}>
					close
				</button>
			</Modal>
		</div>
	);
};

ModalComp.defaultProps = {
	title: 'Email Sent!',
	mainText: 'A verification email has been dispatched to your email address!',
	secondaryText:
		'Please validate your account by clicking the line provided in the email.',
};

export default ModalComp;
