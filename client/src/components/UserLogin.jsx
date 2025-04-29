import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import React from "react";

const UserLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyBox, setVerifyBox] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [image, setImage] = useState(false);

  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const {
    setShowUserLogin,
    backendUrl,
    setUserToken,
    setUserData,
    setCompanyData,
    setCompanyToken,
    setIsAdminLogged,
    setAdminToken,
    setAdminData,
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (selectedValue === "student") {
      if (state === "Sign Up" && !isTextDataSubmited) {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/users/check-student",
            {
              registration,
            }
          );
          if (data.success) {
            if (isRegistered) {
              toast.success(data.message);
            }
            if (isVerified) {
              setIsRegistered(true);
              setIsTextDataSubmited(true);
            } else {
              toast.error("Verify OTP Also");
            }
            return;
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          return;
        }
        // return setIsTextDataSubmited(true);
      }
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/users/login", {
          email,
          password,
        });
        console.log(data);

        if (data.success) {
          if (data.user.role == "student") {
            setUserData(data.user);
            setUserToken(data.token);
            localStorage.setItem("studentToken", data.token);
          } else if (data.user.role == "hr") {
            localStorage.setItem("companyToken", data.token);
            setCompanyData(data.user.company);
            setCompanyToken(data.token);
            navigate("/dashboard");
          } else {
            localStorage.setItem("adminToken", data.token);
            setIsAdminLogged(true);
            setAdminToken(data.token);
            setAdminData(data.user);
            navigate("/admin/dashboard");
          }
          setShowUserLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("registration", registration);
        formData.append("email", email);
        formData.append("image", image);
        formData.append("role", selectedValue);

        const { data } = await axios.post(
          backendUrl + "/api/users/register",
          formData
        );
        // console.log(data);
        if (data.success) {
          if (data.user.role == "student") {
            setUserData(data.user);
            setUserToken(data.token);
            localStorage.setItem("studentToken", data.token);
          } else if (data.user.role == "hr") {
            localStorage.setItem("companyToken", data.token);
            setCompanyToken(data.token);
            navigate("/create-company");
          } else {
            localStorage.setItem("adminToken", data.token);
            setAdminToken(data.adminToken);
            setAdminData(data.adminUser);
            setIsAdminLogged(true);
            navigate("/admin/dashboard");
          }
          setShowUserLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleOtpHandler = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/users/send-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setVerifyBox(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleVerifyOtpHandler = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/users/verify-otp", {
        email,
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        setIsVerified(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 sm:p-[50px] rounded-xl text-slate-500'
      >
        <h1 className='text-center text-3xl sm:text-4xl text-neutral-700 font-semibold font-primary mb-1 '>
          {state}
        </h1>
        <p className='text-sm sm:text-[11px] text-center'>
          Welcome Back! Please {state} to continue
        </p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor='image'>
                <img
                  className='w-16 h-16 rounded-full'
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=''
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type='file'
                  id='image'
                  hidden
                />
              </label>
              <p>
                Upload Your <br /> Photo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div>
                <div className='group border pl-4 pr-[70px] py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
                  <img
                    src={assets.person_icon}
                    alt=''
                    className='shrink-0 pl-2'
                  />
                  <select
                    className='outline-none text-sm p-2 flex-1 w-auto'
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option value=''>Select the role</option>
                    <option value='hr'>Hr</option>
                    <option value='student'>Student</option>
                  </select>
                </div>

                <div className='group border pl-4 pr-[70px] py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
                  <img
                    src={assets.person_icon}
                    alt=''
                    className='shrink-0 pl-2'
                  />
                  <input
                    className='outline-none text-sm p-2 flex-1 w-auto'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type='text'
                    placeholder={
                      selectedValue === "hr" ? "Hr Name" : "Student Name"
                    }
                    required
                  />
                </div>
                {selectedValue == "student" && (
                  <div className='group border pl-4 pr-[70px] py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
                    <img
                      src={assets.person_icon}
                      alt=''
                      className='shrink-0 pl-2'
                    />
                    <input
                      className='outline-none text-sm p-2 flex-1 w-auto'
                      onChange={(e) => setRegistration(e.target.value)}
                      value={registration}
                      type='text'
                      placeholder='Registration Number'
                      required
                    />
                  </div>
                )}
              </div>
            )}

            {/* Email Input */}
            <div className='group border pl-4 pr-4 py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
              <img src={assets.email_icon} alt='' className='shrink-0 pl-2' />
              <input
                className='outline-none text-sm p-3 flex-1 w-auto'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Email'
                required
              />

              {/* ------------- KRishna ----------- */}
              {state === "Sign Up" && email != "" && (
                <button
                  className='ml-auto text-green-600'
                  onClick={handleOtpHandler}
                >
                  Sent OTP
                </button>
              )}
            </div>
            {state === "Sign Up" && verifyBox && (
              <div className='group border pl-4 pr-4 py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
                <img src={assets.email_icon} alt='' className='shrink-0 pl-2' />
                <input
                  className='outline-none text-sm p-2 flex-1 w-auto'
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type='text'
                  placeholder='Enter 6 digit - otp'
                  required
                />
                {state === "Sign Up" && otp != "" && (
                  <button
                    className={`${
                      isVerified ? "text-gray-700" : "text-green-600"
                    } ml-auto `}
                    onClick={handleVerifyOtpHandler}
                    disabled={isVerified}
                  >
                    Verify OTP
                  </button>
                )}
                {/* ------------- KRishna ----------- */}
              </div>
            )}

            {/* Password Input */}
            <div className='group border pl-4 pr-[70px] py-3 flex items-center justify-start gap-2 rounded-[10px] mt-5 transition duration-300 ease-in-out focus-within:border-primary w-full'>
              <img
                src={assets.location_icon}
                alt=''
                className='shrink-0 pl-2'
              />
              <input
                className='outline-none text-sm p-2 flex-1 w-auto'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className='text-md text-[#5a70ec] mt-4 cursor-pointer font-primary '>
            Forget password?
          </p>
        )}
        <button
          type='submit'
          className='bg-primary w-full text-white py-3 rounded-xl mt-4 text-bold font-primary text-[18px] hover:bg-slate-600 transition duration-300 ease-in-out'
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>
        {state === "Login" ? (
          <p className='mt-5 text-center font-primary '>
            Don't have an account?{" "}
            <span
              className='text-primary cursor-pointer hover:text-slate-600 transition duration-300 ease-in-out'
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center hover:text-slate-600 transition duration-300 ease-in-out'>
            Already have an account?{" "}
            <span
              className='text-primary cursor-pointer'
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={(e) => setShowUserLogin(false)}
          className='absolute top-5 right-5 cursor-pointer'
          src={assets.cross_icon}
          alt=''
        />
      </form>
    </div>
  );
};

export default UserLogin;
