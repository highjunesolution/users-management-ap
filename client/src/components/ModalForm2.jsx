import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../apis/users";
import Swal from "sweetalert2";
import axios from "axios";

const ModalForm2 = ({ modal, setModal, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    zipcode: 0,
    province: "",
    district: "",
    subDistrict: "",
    address1: "",
    address2: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [selectedProv, setSelectedProv] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [isTypingZip, setIsTypingZip] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/province_with_district_and_sub_district.json",
        );
        // console.log(res.data);
        setProvinces(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Can't fetch data of province");
      }
    };

    fetchProvince();
  }, []);

  const handleOnChange = (e) => {
    if (e.target.name === "zipcode") {
      setIsTypingZip(true);
      const zip = e.target.value.trim();

      let foundProvince = null;
      let foundDistricts = [];
      let foundSubDistricts = [];

      provinces.forEach((province) => {
        province.districts.forEach((district) => {
          const subs = district.sub_districts.filter(
            (sub) => sub.zip_code == zip,
          );

          if (subs.length > 0) {
            foundProvince = province;
            foundDistricts.push(district);
            foundSubDistricts.push(...subs);
          }
        });
      });

      setSelectedProv(foundProvince);
      setDistricts(foundDistricts);
      setSubDistricts(foundSubDistricts);
      const newForm = {
        ...form,
        zipcode: zip,
        province: foundProvince?.name_en || "",
        district: foundDistricts[0]?.name_en || "",
        subDistrict: foundSubDistricts[0]?.name_en || "",
      };

      setForm(newForm);
      return;
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) return toast.error("Email is required");
    if (!isValidEmail(form.email)) {
      setValidEmail(true)
      return toast.error("Invalid email format")
    }
    if (!form.password || !form.confirmPassword)
      return toast.error("Password and Confirm is required");
    if (form.password !== form.confirmPassword)
      return toast.error("Password doesn't match");
    if (!form.firstName || !form.lastName)
      return toast.error("First name and Last name is required");
    if (!form.address1 || !form.address2)
      return toast.error("All address is required, please enter all fields");
    console.log(form);

    try {
      // แสดง loading
      Swal.fire({
        title: "Adding data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await createUser(form);

      // success
      Swal.fire("Success", `User is created!`, "success");

      onClose();
    } catch (err) {
      // error
      Swal.fire("Error", err?.response?.data?.msg || "Network Error", "error");
    }
  };

  return (
    <div className="fixed top-0 left-0 inset-0 z-50 flex justify-center items-center">
      {/* backdrop */}
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className="bg-black/15 inset-0 absolute"
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl mx-6 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-200 ease-out rounded-xl shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between px-4 py-4 border-b-2 border-gray-200 shadow-md">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Add User Details</h1>
            <p className="text-sm text-gray-500">Please fill form below</p>
          </div>
          <button onClick={() => setModal(!modal)} className="cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 px-6 py-6 overflow-y-auto"
        >
          <div className="col-span-full border-l-4 border-sky-200 px-4">
            <h1 className="text-xl font-semibold">Personal</h1>
          </div>
          <div className="grid gap-2 md:col-span-full">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleOnChange}
              type="email"
              name="email"
              placeholder="Input your email"
              className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
            />
            {ValidEmail && (
              <span className="text-[14px] text-red-400">
                Invalid email format
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Input your password"
                className="border border-gray-300 rounded-md px-2 py-1 outline-0 w-full bg-slate-50"
              />

              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 right-0 translate-y-[50%] -translate-x-2 text-gray-400 duration-300"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="border border-gray-300 rounded-md px-2 py-1 outline-0 w-full bg-slate-50"
              />

              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 right-0 translate-y-[50%] -translate-x-2 text-gray-400 duration-300"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={handleOnChange}
              type="text"
              name="firstName"
              placeholder="Input your first name"
              className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={handleOnChange}
              type="text"
              name="lastName"
              placeholder="Input your last name"
              className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
            />
          </div>

          {/* Address */}
          <div className="col-span-full border-l-4 border-sky-200 px-4 mt-4">
            <h1 className="text-xl font-semibold">Address </h1>
          </div>
          {/* Zipcode */}
          <div className={`grid gap-2 `}>
            <label htmlFor="email">Zip Code</label>
            <input
              onChange={handleOnChange}
              type="number"
              maxLength={5}
              step={false}
              name="zipcode"
              placeholder="Enter your zip code"
              className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
            />
            {isTypingZip && !selectedProv && (
              <span className="text-[14px] text-red-400">
                Invalid zip code, please try again
              </span>
            )}
          </div>
          {selectedProv && (
            <>
              <div className="grid gap-2">
                <label htmlFor="province">Province</label>
                <select
                  onChange={handleOnChange}
                  name="province"
                  className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50 cursor-not-allowed"
                >
                  {!selectedProv ? (
                    <option>👈 Please enter your zip code</option>
                  ) : (
                    <option value={selectedProv.name_en}>
                      {selectedProv.name_en}
                    </option>
                  )}
                </select>
              </div>

              <div className="grid gap-2">
                <label>District</label>
                <select
                  onChange={handleOnChange}
                  name="district"
                  className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
                >
                  {districts.length > 0 ? (
                    districts.map((item, index) => (
                      <option
                        key={index}
                        value={item.name_en}
                        selected={index == 0}
                      >
                        {item.name_en}
                      </option>
                    ))
                  ) : (
                    <option>👈 No district</option>
                  )}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Subdistrict</label>
                <select
                  onChange={handleOnChange}
                  name="subDistrict"
                  className="border border-gray-300 rounded-md px-2 py-1 outline-0 bg-slate-50"
                >
                  {subDistricts.length > 0 ? (
                    subDistricts.map((item, index) => (
                      <option key={index} value={item.name_en}>
                        {item.name_en}
                      </option>
                    ))
                  ) : (
                    <option>👈 No subdistrict</option>
                  )}
                </select>
              </div>
            </>
          )}

          {/* Address 1 */}
          <div className="grid gap-2 col-span-full">
            <label htmlFor="address1">Address 1</label>
            <textarea
              onChange={handleOnChange}
              name="address1"
              className="border border-gray-300 rounded-md px-2 py-2 outline-0 bg-slate-50 h-20"
            ></textarea>
          </div>
          {/* Address 2 */}
          <div className="grid gap-2 col-span-full">
            <label htmlFor="address2">Address 2</label>
            <textarea
              onChange={handleOnChange}
              name="address2"
              className="border border-gray-300 rounded-md px-2 py-2 outline-0 bg-slate-50 h-20"
            ></textarea>
          </div>
          {/* footer */}
          <div className="col-span-full flex px-4 pt-4 border-t-2 border-gray-200 justify-end gap-x-2">
            <button
              type="submit"
              className="bg-gray-400 text-white px-4 py-1 rounded-md cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setModal(!modal);
              }}
              className="border border-gray-300 px-4 py-1 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm2;
