import { useContext } from "react";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/gbu_logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

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
            <div className='flex items-center gap-3 font-primary text-[12px]'>
              <Link to='/applications'>Applied Jobs</Link>
              <p>|</p>
              <p className='max-sm:hidden'>
                Hi, {user.firstName} {user.lastName || ""}
              </p>
              <UserButton />
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
                onClick={(e) => openSignIn()}
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
