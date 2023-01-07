import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	passEmail,
	sendEmail,
	abortController,
} from '../../slices/signUpSlice';
import ModalComp from '../modals/ModalComp';
import { useAppDispatch, useAppSelector } from '../../hooks';
import '../styles/Form.css';

interface InputProps
	extends React.PropsWithRef<JSX.IntrinsicElements['input']> {
	label: string;
	name: string;
	type: string;
}

const MyInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ name, type, label, ...rest }, ref) => {
		return (
			<div className='inputForm'>
				<label htmlFor={name}>{label}</label>
				<input type={type} name={name} {...rest} ref={ref} />
			</div>
		);
	},
);

interface Inputs {
	username: string;
	showEmail?: Boolean;
	emailconfirmation?: string;
	email?: string;
	password: string;
	passwordConfirmation?: string;
}

const errorSchema = yup
	.object({
		email: yup
			.string()
			.email()
			.when('showEmail', {
				is: true,
				then: yup.string().email().required('Enter email'),
			}),
		emailconfirmation: yup
			.string()
			.oneOf([yup.ref('email'), null], 'Emails must match'),
	})
	.required();

interface emailProps {
	password?: Boolean;
}

const ResendEmail: React.FC<emailProps> = ({ password }) => {
	const status = useAppSelector(state => state.signupReducer.status);
	const dispatch = useAppDispatch();

	const onSubmitconsole = (data: Inputs) => {
		if (password) {
			dispatch(passEmail(data));
		} else {
			dispatch(sendEmail(data));
		}
		return () => {
			abortController.abort();
		};
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(errorSchema),
	});

	const renderModal = () => {
		if (
			status === 'sendEmail fulfilled' ||
			status === 'passEmail fulfilled'
		) {
			return <ModalComp />;
		} else if (status === 'rejected') {
			return <ModalComp />;
		}
	};

	return (
		<div>
			{renderModal()}
			<h2 id='logo' className='upOrIn'>
				{password
					? 'Resend Password Link'
					: 'Resend Email Confirmation'}

				<p>
					Contact an admin or enter your email to recieve another link
					in the mail.
				</p>
			</h2>
			<form className='signform' onSubmit={handleSubmit(onSubmitconsole)}>
				<fieldset className='fieldset'>
					<MyInput
						label='Enter email: '
						{...register('email')}
						type='text'
						autoComplete='email'
					/>
					<p>{errors.email?.message}</p>
				</fieldset>

				<fieldset className='fieldset'>
					<MyInput
						label='Re-enter email: '
						{...register('emailconfirmation')}
						type='text'
						autoComplete='email'
					/>
					<p>{errors.emailconfirmation?.message}</p>
				</fieldset>
				<button
					disabled={status === 'pending' ? true : false}
					className='signupSubmit'>
					{password ? 'Send Password Link' : 'Send Email Link'}
				</button>
			</form>
		</div>
	);
};

ResendEmail.defaultProps = {
	password: false,
};

export default ResendEmail;
