import { useContext } from "react";

// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/gbu_logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  // const { openSignIn } = useClerk();
  // const { user } = useUser();

  const navigate = useNavigate();

  const {
    setShowRecruiterLogin,
    setShowStudentLogin,
    userData,
    setUserToken,
    setUserData,
  } = useContext(AppContext);
  const user = userData;

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("studentToken");
    setUserData(null);
    navigate("/");
  };

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
      <div className='shadow py-4'>
        <div className='container px-5 2xl:px-20 mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <img
              onClick={() => navigate("/")}
              className='cursor-pointer'
              alt={""}
              src={logo}
              width={60}
              height={60}
            />
            <div>
              <h1 className='font-bold text-xl text-blue-800 tracking-wider'>
                GAUTAM BUDDHA UNIVERSITY
              </h1>
              <p>Corporate Relations Cell</p>
            </div>
          </div>

          {user ? (
            <div className='flex items-center gap-3 font-primary text-[14px]'>
              <p className='max-sm:hidden'>Hi, {user.name}</p>
              <div className='relative group'>
                <img
                  className='w-10 h-10 border rounded-full'
                  src={userData.image}
                  alt=''
                />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li
                      className='p-2 w-full border-b-2 cursor-pointer'
                      onClick={() => navigate("/applications")}
                    >
                      Applied Jobs
                    </li>
                    <li
                      onClick={logout}
                      className='py-1 px-2 cursor-pointer pr-10'
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex gap-4 max:sm:text-xs'>
              <button
                onClick={(e) => setShowRecruiterLogin(true)}
                className='text-gray-600 text-[10px] sm:text-lg sm:pr-2 hover:text-primary transition duration-300 ease-in-out'
              >
                Recruiter Login
              </button>
              <button
                onClick={(e) => setShowStudentLogin(true)}
                className='bg-primary text-white px-4 sm:px-8 py-2 rounded-xl font-primary text-sm sm:text-2xl hover:bg-slate-600 transition duration-300 ease-in-out transform hover:-translate-y-[3px]'
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
