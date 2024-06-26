"use client";
import React, { useEffect, useState } from "react";
import MoviesList from "components/MoviesList";
import EmptyList from "components/EmptyList";
import { useGetMoviesQuery } from "services/movies";
import Loader from "common/Loader";
import Error from "common/error";
import { useSelector } from "react-redux";
import { mountStore } from "services/user";
import { useDispatch } from "react-redux";
const Movies = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || {});
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: moviesData,
    isFetching,
    error,
  } = useGetMoviesQuery(
    {
      page: currentPage,
      pageSize: pageSize,
    },
    { refetchOnMountOrArgChange: user?.moviesList }
  );
  const movies = moviesData?.data || [];
  const totalCount = moviesData?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (!isFetching) {
      dispatch(mountStore());
    }
  }, [isFetching, dispatch]);

  return (
    <>
      {error && <Error />}
      {!error && (
        <>
          {isFetching ? (
            <Loader />
          ) : (
            <div className="container px-6">
              {movies.length === 0 ? (
                <EmptyList />
              ) : (
                <MoviesList
                  movies={movies}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
