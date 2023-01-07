import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';

export const abortController = new AbortController();

interface userState {
	username?: String;
	password?: String;
	email?: String;
}

export const signUp = createAsyncThunk(
	'/signup',
	async (userInfo: userState) => {
		const res = await fetch('http://localhost:3093/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();
		return data;
	},
);

export const signIn = createAsyncThunk(
	'/signin',
	async (userInfo: userState) => {
		const res = await fetch('http://localhost:3093/signin', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();
		return data;
	},
);

export const signOut = createAsyncThunk('/signout', async () => {
	const res = await fetch('http://localhost:3093/signout', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
	const data = await res.json();
	return data;
});

export const passEmail = createAsyncThunk(
	'/emailverifypassword',
	async (userInfo: userState) => {
		const res = await fetch('http://localhost:3093/emailverifypassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();
		return data;
	},
);

export const sendEmail = createAsyncThunk(
	'/resendmail/send',
	async (userInfo: userState) => {
		const res = await fetch('http://localhost:3093/resendmail/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();
		return data;
	},
);

export const passwordChanger = createAsyncThunk(
	'/resetpass',
	async (userInfo: userState) => {
		const res = await fetch('http://localhost:3093/resetpass', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();
		return data;
	},
);

interface Signup {
	status: String | null;
}

const initialState = {
	status: null,
} as Signup;

const signupSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		clearStatus: state => {
			state.status = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(signUp.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.status = 'signUp fulfilled';
		});
		builder.addCase(signUp.rejected, (state, action) => {
			state.status = 'signUp rejected';
		});
		builder.addCase(signIn.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.status = 'signIn fulfilled';
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.status = 'signin rejected';
		});
		builder.addCase(signOut.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.status = 'signOut fulfilled';
		});
		builder.addCase(signOut.rejected, (state, action) => {
			state.status = 'rejected';
		});
		builder.addCase(passEmail.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(passEmail.fulfilled, (state, action) => {
			state.status = 'passEmail fulfilled';
		});
		builder.addCase(passEmail.rejected, (state, action) => {
			state.status = 'rejected';
		});
		builder.addCase(sendEmail.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(sendEmail.fulfilled, (state, action) => {
			state.status = 'sendEmail fulfilled';
		});
		builder.addCase(sendEmail.rejected, (state, action) => {
			state.status = 'rejected';
		});
		builder.addCase(
			passwordChanger.fulfilled,
			(state, action: PayloadAction<{ payload: Object }>) => {
				state.status = 'fulfilled';
			},
		);
		builder.addCase(passwordChanger.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(passwordChanger.rejected, (state, action) => {
			state.status = 'rejected';
		});
	},
});

export const { clearStatus } = signupSlice.actions;

export default signupSlice.reducer;
