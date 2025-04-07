import { useNavigate } from "react-router-dom";
import logo from "../../assets/gbu_logo.png";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Bgimage from "../../assets/Vinay_kumar.jpeg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { adminData, setAdminData, setAdminToken } = useContext(AppContext);
  const logout = () => {
    setAdminData(null);
    setAdminToken(null);
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdminLogged");
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
          {!adminData && (
            <div onClick={() => navigate("/")}>
              <h1 className='text-blue-600 cursor-pointer'>Home</h1>
            </div>
          )}

          {adminData && (
            <div className='flex items-center gap-3 font-primary text-[14px]'>
              <p className='max-sm:hidden'>Hi, {adminData.name}</p>
              <div className='relative group'>
                <img
                  className='w-10 h-10 border rounded-full'
                  src={Bgimage}
                  alt=''
                />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li
                      className='py-1 px-2 cursor-pointer pr-10'
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminNavbar;
