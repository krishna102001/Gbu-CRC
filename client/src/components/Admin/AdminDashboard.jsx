import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
const AdminDashboard = () => {
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
      <div className='flex items-start'>
        {/* Left Sidebar with option to add Job, manage jobs , view */}
        <div className='inline-block min-h-screen border-r-2 '>
          <ul className='flex flex-col items-start pt-10 text-gray-800 p-5 rounded-xl gap-3'>
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-4 w-full hover:bg-gray-200 rounded-xl  ${
                  isActive &&
                  "bg-blue-200 border-r-4 border-primary p-4 rounded-xl text-primary transition duration-200 ease-in-out"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className='min-w-4' src={assets.add_icon} alt='' />
              <p className='max-sm:hidden'>List of company</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-4 w-full hover:bg-gray-200 rounded-xl  ${
                  isActive &&
                  "bg-blue-200 border-r-4 border-primary p-4 rounded-xl text-primary transition duration-200 ease-in-out"
                }`
              }
              to={"/dashboard/manage-job"}
            >
              <img className='min-w-4' src={assets.home_icon} alt='' />
              <p className='max-sm:hidden'>Registered Student </p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-4 w-full hover:bg-gray-200 rounded-xl  ${
                  isActive &&
                  "bg-blue-200 border-r-4 border-primary p-4 rounded-xl text-primary transition duration-200 ease-in-out"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className='min-w-4' src={assets.person_tick_icon} alt='' />
              <p className='max-sm:hidden'>Student Applied</p>
            </NavLink>
          </ul>
        </div>

        <div className='flex-1 h-full p-2 sm:p-5'>
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
