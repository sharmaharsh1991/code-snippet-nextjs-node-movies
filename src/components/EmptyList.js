"use client";
import Link from "next/link";
import LogoutIcon from "assets/images/icons/logout.svg";
import { removeToken } from "helpers/utils";
import { useRouter } from "next/navigation";

const EmptyList = () => {
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
    router.push("/sign-in");
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div>
          <h2 className="mb-10 text-center">Your movie list is empty</h2>
          <div className="flex justify-center items-center">
            <Link href={"/movies/add"}>
              <button className="button max-w-52 px-5">Add a new movie</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center fixed top-0 right-0 p-4">
        <button onClick={handleLogout} className="flex items-center ">
          <span className="text-base hidden sm:block font-bold text-white">
            Logout
          </span>{" "}
          <LogoutIcon className="ms-3" />
        </button>
      </div>
    </>
  );
};

export default EmptyList;
