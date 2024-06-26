// moviesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "helpers/utils";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const moviesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["movies", "singleMovie"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page = 1, pageSize = 10 }) => {
        return `movies?page=${page}&pageSize=${pageSize}`;
      },
      providesTags: ["movies"],
    }),

    getMovieById: builder.query({
      query: (id) => {
        return `movies/${id}`;
      },
      providesTags: ["singleMovie"],
    }),

    addMovie: builder.mutation({
      query: (values) => {
        return {
          url: "movies",
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["movies"],
    }),
    updateMovie: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `movies/${id}`,
          method: "PATCH",
          body: values,
        };
      },
      invalidatesTags: ["movies", "singleMovie"],
    }),

    deleteMovie: builder.mutation({
      query: (id) => {
        return {
          url: `movies/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["movies"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
