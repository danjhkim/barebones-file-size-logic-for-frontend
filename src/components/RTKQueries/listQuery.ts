import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { listObject } from './types';

// Define a service using a base URL and expected endpoints
export const fileListApi = createApi({
	reducerPath: 'fileListApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3093',
		prepareHeaders(headers) {
			return headers;
		},
		credentials: 'include',
	}),
	tagTypes: ['list'],
	endpoints: builder => ({
		getListofFiles: builder.query<listObject, null>({
			query: () => ({
				url: `/list`,
				method: 'GET',
			}),
			providesTags: ['list'],
		}),
		deleteFile: builder.mutation<void, string>({
			query: key => ({
				url: `/delete/${key}`,
				method: 'GET',
			}),
			invalidatesTags: ['list'],
		}),
		uploadFiles: builder.mutation<void, object>({
			query: file => ({
				url: `/upload`,
				method: 'POST',
				body: file,
			}),
			invalidatesTags: ['list'],
		}),
	}),
});

export const {
	useGetListofFilesQuery,
	useDeleteFileMutation,
	useUploadFilesMutation,
} = fileListApi;
