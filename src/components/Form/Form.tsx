import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signUp, abortController, signIn } from '../../slices/signUpSlice';
import ModalComp from '../modals/ModalComp';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuth } from '../../slices/authSlice';
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
		showEmail: yup.boolean(),
		username: yup
			.string()
			.required('No username provided.')
			.min(3, 'Mininum 3 characters')
			.matches(/[a-zA-Z]/, 'username can only contain Latin letters.')
			.defined('You must enter a username'),
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
		password: yup
			.string()
			.defined('No password provided.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.required();

interface formProps {
	formType?: string;
	upOrIn?: string;
}

const Form = ({ formType, upOrIn }: formProps) => {
	const status = useAppSelector(state => state.signupReducer.status);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmitconsole = (data: Inputs) => {
		if (formType === 'register') {
			dispatch(signUp(data))
				.unwrap()
				.then(() => {
					reset();
				});
		} else if (formType === 'signin') {
			dispatch(signIn(data))
				.unwrap()
				.then(() => {
					reset();
					dispatch(checkAuth());
					navigate('/');
				});
		}

		return () => {
			abortController.abort();
		};
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(errorSchema),
		defaultValues: {
			showEmail: false,
		},
	});

	const renderModal = () => {
		if (status === 'signUp fulfilled') {
			return <ModalComp />;
		} else if (status === 'signin rejected') {
			return (
				<ModalComp
					title='Login Failed'
					mainText=''
					secondaryText='Please try again or contract an admin.'
				/>
			);
		} else if (status === 'signUp rejected') {
			return (
				<ModalComp
					title='Sign up Failed'
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
				{upOrIn}
				{formType === 'passwordreset' ? (
					<p>
						Enter the email associated with this account to recieve
						your password link.
					</p>
				) : null}
			</h2>
			<form className='signform' onSubmit={handleSubmit(onSubmitconsole)}>
				<fieldset className='fieldset'>
					{formType === 'passwordreset' ? null : (
						<MyInput
							label={
								formType === 'signin'
									? 'Enter a username:'
									: 'Log in: '
							}
							{...register('username')}
							type='text'
							hidden={formType === 'passwordreset'}
							autoComplete='username'
							placeholder={
								formType === 'signin'
									? 'Enter a username or email:'
									: 'Enter a username: '
							}
						/>
					)}
					<p>{errors.username?.message}</p>
				</fieldset>
				{formType === 'register' && (
					<fieldset className='fieldset'>
						<MyInput
							label='Enter email: '
							{...register('email')}
							type='text'
							autoComplete='email'
						/>
						<p>{errors.email?.message}</p>
					</fieldset>
				)}
				{formType === 'register' && (
					<fieldset className='fieldset'>
						<MyInput
							label='Re-enter email: '
							{...register('emailconfirmation')}
							type='text'
							autoComplete='email'
						/>
						<p>{errors.emailconfirmation?.message}</p>
					</fieldset>
				)}
				{formType === 'passwordreset' ? null : (
					<fieldset className='fieldset'>
						<MyInput
							label='Enter password: '
							{...register('password')}
							type='password'
						/>
						<p>{errors.password?.message}</p>
					</fieldset>
				)}
				{formType === 'register' || formType === 'passwordrest' ? (
					<fieldset className='fieldset'>
						<MyInput
							label='Re-enter password: '
							{...register('passwordConfirmation')}
							type='password'
							autoComplete='off'
						/>
						<p>{errors.passwordConfirmation?.message}</p>
					</fieldset>
				) : null}
				{/* <div>{auth.errorMessage}</div> */}
				{formType === 'signin' ? (
					<>
						<Link className='forgot' to='/password'>
							Forgot Password?
						</Link>
						<Link className='register' to='/register'>
							Register
						</Link>
					</>
				) : null}

				<button
					disabled={status === 'pending' ? true : false}
					className='signupSubmit'>
					{upOrIn}
				</button>
			</form>
		</div>
	);
};

export default Form;
