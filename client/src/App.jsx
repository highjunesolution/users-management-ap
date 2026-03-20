
import React, { useEffect, useState } from "react";
import { listUser } from "./apis/users";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import NavMenu from "./components/NavMenu";
import ModalForm from "./components/ModalForm";
import HeaderBadge from "./components/HeaderBadge";


const App = () => {
  const [modal, setModal] = useState(false);
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
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 xl:px-0">
            <NavMenu/>
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 xl:px-0 py-4 space-y-4">
            <HeaderBadge modal={modal} setModal={setModal} />
            <div className="bg-white rounded-xl px-4 py-4"> table</div>
          </div>

          {/* Modal Component*/}
          {modal && (
            <ModalForm
              modal={modal}
              setModal={setModal}
              onClose={() => setModal(!modal)}
            />
          )}
        </div>
        <div className="bg-white h-10">
          <div className="h-full flex justify-center items-center">
            <h1 className="text-sm text-gray-400">
              Copy right @2026 - MIS Division
            </h1>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" limit={5} />
    </>
  );
};

export default App;
