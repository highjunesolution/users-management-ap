import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { listUser } from "./apis/users";
import Swal from "sweetalert2";

const menuItem = [
  {
    id: 1,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    name: "Contact",
    to: "/",
  },
  {
    id: 3,
    name: "Service",
    to: "/",
  },
];

const NavMenu = () => {
  return (
    <div className="flex justify-between items-center gap-x-4 h-full py-4">
      <Link to={"/"} className="text-4xl cursor-pointer">
        <FontAwesomeIcon icon={faApple} />
      </Link>
      <div className="flex-1 space-x-4">
        {menuItem.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="bg-gray-200 py-2 px-4 font-medium rounded-md"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="text-slate-500">
        <FontAwesomeIcon icon={faPowerOff} />
      </div>
    </div>
  );
};

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
          <NavMenu/>
        </div>
      </div>
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-4">
          <div className="bg-white rounded-md p-4">
            <div className="">
              <div>

              <h1 className="text-md font-medium">User Manage</h1>
              <p className="text-sm text-gray-400">Create user for action</p>
              </div>
              <div>
                <button></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-10">
        <div className="h-full flex justify-center items-center">
          <h1 className="text-sm text-gray-400">
            Copy right @2026 - Email highjunesolution@gmail.com
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
