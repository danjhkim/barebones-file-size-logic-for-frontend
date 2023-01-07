import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passEmail, abortController } from '../../slices/signUpSlice';
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

const PassForm: React.FC = () => {
	const status = useAppSelector(state => state.signupReducer.status);
	const dispatch = useAppDispatch();

	const onSubmitconsole = (data: Inputs) => {
		dispatch(passEmail(data));

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
		if (status === 'passEmail fulfilled') {
			return <ModalComp />;
		} else if (status === 'rejected') {
			return (
				<ModalComp
					title="Something's wrong"
					secondaryText='Please try again or contract an admin.'
				/>
			);
		}
	};

	return (
		<div>
			{renderModal()}
			<h2 id='logo' className='upOrIn'>
				<p>
					Enter the email associated with this account to recieve your
					password link.
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
					Send Password Link
				</button>
			</form>
		</div>
	);
};

export default PassForm;
