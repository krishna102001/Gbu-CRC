import { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import logo from "../assets/gbu_logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const companyName = companyData.name || "";
  // Function to logout for company

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-job");
    }
  }, [companyData]);

  return (
    <div className='min-h-screen bg-[#F7F7F7]'>
      {/* {Navbar for Recuriter Panel } */}
      <div className='shadow py-4'>
        <div className='px-10 flex justify-between items-center '>
          <div className='flex items-center gap-2'>
            <img
              onClick={(e) => navigate("/")}
              className=' m:w-[120px] cursor-pointer min-w-16 md:w-33 md:min-w-33 flex-shrink-0 object-contain'
              src={logo}
              alt='Logo'
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

          {companyData && (
            <div className='flex items-center gap-3'>
              <p className='max-sm:hidden font-primary text-[20px] font-normal'>
                Welcome, {companyName.toUpperCase()}
              </p>
              <div className='relative group'>
                <img
                  className='w-14 h-14 border rounded-full'
                  src={companyData.image}
                  alt=''
                />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md boder text-sm'>
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
          )}
        </div>
      </div>

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
              <p className='max-sm:hidden'>Add Job</p>
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
              <p className='max-sm:hidden'>Manage Jobs</p>
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
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className='flex-1 h-full p-2 sm:p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
