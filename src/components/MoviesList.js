"use client";
import { useState } from "react";
import PlusIcon from "assets/images/icons/plus.svg";
import LogoutIcon from "assets/images/icons/logout.svg";
import Link from "next/link";
import { removeToken } from "helpers/utils";
import { useRouter } from "next/navigation";
import { useDeleteMovieMutation } from "services/movies";
import ConfirmDialog from "common/ConfirmDialog";
import { toast } from "react-toastify";
import Image from "next/image";
const MoviesList = ({ movies, currentPage, totalPages, onPageChange }) => {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);
  const [deleteMovie] = useDeleteMovieMutation();
  const handleLogout = () => {
    router.push("/sign-in");
    removeToken();
  };
  const handleEdit = (id) => {
    router.push(`movies/edit/${id}`);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteMovie(movieIdToDelete);
      toast.success(response?.data?.message);
      if (currentPage > 1 && movies.length === 1) {
        onPageChange(1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const confirmDelete = (id) => {
    setIsConfirmDialogOpen(true);
    setMovieIdToDelete(id);
  };

  const handleConfirm = () => {
    handleDelete();
    setIsConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
  };
  return (
    <>
      <div className="py-32">
        <div className="flex justify-between items-center mb-32">
          <div className="flex items-center">
            <h2>My movies</h2>
            <Link href={"/movies/add"}>
              <PlusIcon className="ms-3 mt-2" />
            </Link>
          </div>
          <button onClick={handleLogout} className="flex items-center">
            <span className="text-base hidden sm:block font-bold text-white">
              Logout
            </span>{" "}
            <LogoutIcon className="ms-3" />
          </button>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="group bg-card p-2 rounded-xl hover:bg-[#1E414E] transition-all"
            >
              <div className="flex items-center justify-center">
                <Image
                  className="object-cover object-center w-full min-h-[300px] max-h-[300px] xl:min-h-[400px] lg:max-h-[400px] rounded-xl h-full"
                  src={movie.poster}
                  width={400}
                  height={400}
                  alt="product-image"
                />
              </div>
              <div className="flex justify-between items-start">
                <div className="mt-4 mb-2">
                  <h6 className="mb-2 mx-2 break-all">{movie.title}</h6>
                  <p className="mx-2">{movie.publishingYear}</p>
                </div>
                <div className="flex justify-end items-end space-x-4 mb-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(movie._id)}
                    className="invisible group-hover:visible hover:bg-primary-900 py-2.5 mb-2 "
                  >
                    <svg
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmDelete(movie._id)}
                    className="invisible group-hover:visible hover:bg-primary-900 py-2.5 mb-3 mr-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-32 flex-wrap">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`pagination-control ${
              currentPage === 1 ? "disabled" : ""
            }`}
            disabled={currentPage === 1}
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => onPageChange(page + 1)}
              className={`pagination-count ${
                currentPage === page + 1 ? "bg-primary" : "bg-card"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`pagination-control ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages}
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {isConfirmDialogOpen && (
        <ConfirmDialog
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message={"Are you sure you want to delete this item?"}
        />
      )}
    </>
  );
};

export default MoviesList;
