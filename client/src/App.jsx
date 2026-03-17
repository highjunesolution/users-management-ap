import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { listUser } from "./apis/users";
import Swal from "sweetalert2";

const App = () => {
  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    listUser()
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success!",
          text: "Users loaded successfully.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: err?.message || "Something went wrong.",
          icon: "error",
        });
      });
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="flex justify-between items-center gap-x-4 h-full py-4">
            <Link to={"/"} className="text-4xl">
              <FontAwesomeIcon icon={faApple} />
            </Link>
            <div className="flex-1 space-x-4">
              <button className="bg-gray-200 py-2 px-4 font-medium rounded-md">
                Home
              </button>
              <button className="bg-gray-200 py-2 px-4 font-medium rounded-md">
                Home
              </button>
            </div>
            <div className="text-slate-500">
              <FontAwesomeIcon icon={faPowerOff} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">Table</div>
      <div className="bg-white h-10">
        <div className="h-full flex justify-center items-center">
          <h1 className="text-sm text-gray-400">
            Copy Right @2026 - Email highjunesolution@gmail.com
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
