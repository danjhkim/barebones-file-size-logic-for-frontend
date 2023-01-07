import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const checkAuth = createAsyncThunk('/usercheck', async () => {
	const res = await fetch('http://localhost:3093/usercheck', {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
	const data = await res.json();
	return data;
});

interface AuthState {
	auth: Object | null;
	status: String | null;
}
const initialState = {
	auth: null,
	status: null,
} as AuthState;

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logOut: state => {
			state.auth = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(checkAuth.pending, (state, action) => {
			state.status = 'pending';
		});
		builder.addCase(
			checkAuth.fulfilled,
			(state, action: PayloadAction<{ payload: Object }>) => {
				state.status = 'fulfilled';
				state.auth = action.payload;
			},
		);
		builder.addCase(checkAuth.rejected, (state, action) => {
			state.status = 'rejected';
		});
	},
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
