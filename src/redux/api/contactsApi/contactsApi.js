import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6403757c302b5d671c50022d.mockapi.io/api/v1/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts/',
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query(id) {
        return { url: `contacts/${id}`, method: 'DELETE' };
      },
      invalidatesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query(body) {
        return { url: `contacts/`, method: 'POST', body };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});
export const {
  useGetContactsQuery,
  useDeleteContactsMutation,
  useAddContactsMutation,
} = contactsApi;
