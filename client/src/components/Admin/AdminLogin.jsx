import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/gbu_logo.png";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const inputFocus = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setAdminToken, setAdminData, setIsAdminLogged } =
    useContext(AppContext);

  const { mutate: handleSubmission, isPending } = useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          toast.success("Login Successfully");
          console.log(data); // console.log
          localStorage.setItem("adminToken", data.adminToken);
          setAdminToken(data.adminToken);
          setAdminData(data.adminUser);
          navigate("/admin/dashboard");
          setIsAdminLogged(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <motion.div
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ once: true }} // Prevents re-triggering when scrolling back
    >
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img alt='GBU LOGO' src={logo} className='mx-auto h-24 w-auto' />
          <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          <h3 className='mt-2 text-center text-xl/9 font-semibold tracking-tight text-gray-900'>
            Admin Login
          </h3>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-10'>
          <form onSubmit={handleSubmission} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  ref={inputFocus}
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
