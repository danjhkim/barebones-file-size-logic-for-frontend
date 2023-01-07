import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import signupReducer from './slices/signUpSlice';
import { fileListApi } from './components/RTKQueries/listQuery';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
	reducer: {
		authReducer,
		signupReducer,
		[fileListApi.reducerPath]: fileListApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(fileListApi.middleware),
});

setupListeners(store.dispatch);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
