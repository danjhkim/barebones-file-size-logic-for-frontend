import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { abortController, passwordChanger } from '../../slices/signUpSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import '../styles/Form.css';
import ModalComp from '../modals/ModalComp';

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
		password: yup
			.string()
			.defined('No password provided.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.required();

const ChangePass: React.FC = () => {
	const status = useAppSelector(state => state.signupReducer.status);

	const dispatch = useAppDispatch();

	const onSubmitconsole = (data: Inputs) => {
		dispatch(passwordChanger(data));

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
		if (status === 'fulfilled') {
			return (
				<ModalComp
					title='Password'
					mainText=''
					secondaryText='Password has been changed'
				/>
			);
		} else if (status === 'rejected') {
			return (
				<ModalComp
					title="Something's wrong"
					mainText=''
					secondaryText='Please try again or contract an admin.'
				/>
			);
		}
	};

	return (
		<div>
			{renderModal()}
			<h2 id='logo' className='upOrIn'>
				Password
				<p>Change your password now.</p>
			</h2>
			<form className='signform' onSubmit={handleSubmit(onSubmitconsole)}>
				<fieldset className='fieldset'>
					<MyInput
						label='Enter password: '
						{...register('password')}
						type='password'
					/>
					<p>{errors.password?.message}</p>
				</fieldset>

				<fieldset className='fieldset'>
					<MyInput
						label='Re-enter password: '
						{...register('passwordConfirmation')}
						type='password'
						autoComplete='off'
					/>
					<p>{errors.passwordConfirmation?.message}</p>
				</fieldset>

				<button
					disabled={status === 'pending' ? true : false}
					className='signupSubmit'>
					Change
				</button>
			</form>
		</div>
	);
};

export default ChangePass;
