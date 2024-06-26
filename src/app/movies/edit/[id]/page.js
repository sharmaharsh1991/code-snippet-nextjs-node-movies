"use client";
import MoviesForm from "components/MoviesForm";
import { useGetMovieByIdQuery } from "services/movies";
import Loader from "common/Loader";
import Error from "common/error";

const EditMovie = ({ params }) => {
  const id = params.id;
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id);
  const editPage = true;

  return (
    <>
      {error && <Error />}
      {!error && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container px-6">
              <div className="py-32">
                <div className="w-full xl:w-10/12 m-auto">
                  <h1 className="mb-16 md:mb-32 text-[32px] lg:text-5xl">
                    Edit
                  </h1>
                  <MoviesForm movie={movie} editPage={editPage} id={id} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditMovie;
