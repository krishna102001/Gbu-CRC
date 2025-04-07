import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Loading from "../Loading";
import { assets } from "../../assets/assets";

const ListOfCompany = () => {
  const { backendUrl, adminToken } = useContext(AppContext);
  const [listCompany, setListCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);

  const fetchListOfCompany = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/list-of-company",
        {
          headers: { Authorization: "Bearer " + adminToken },
        }
      );
      console.log(data.listCompanyExist);
      if (data.success) {
        setListCompany(data.listCompanyExist);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveDropdown(null); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (adminToken) {
      fetchListOfCompany();
    }
  }, [adminToken]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ once: true }} // Prevents re-triggering when scrolling back
    >
      <div className='container mx-auto p-4'>
        <div className='overflow-x-auto w-full rounded-xl shadow-lg '>
          <table className='w-full bg-white border-collapse border-gray-300 rounded-xl'>
            <thead className='bg-[#f2f2f2] text-primary'>
              <tr className='border-gray-300 rounded-xl'>
                <th className='py-7 px-3 sm:px-4 text-left w-[2%] text-base font-semibold'>
                  S No.
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[20%] text-base font-semibold'>
                  Company Name
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Company Email
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Company Phone No.
                </th>
              </tr>
            </thead>

            <tbody>
              {listCompany.length === 0 ? (
                <tr>
                  <td
                    colSpan='3'
                    className='py-8 text-center text-gray-500 text-lg'
                  >
                    No companies found
                  </td>
                </tr>
              ) : (
                listCompany.map((company, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='py-5 px-3 sm:px-4 border-b text-center text-base'>
                      {index + 1}
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b flex items-center'>
                      <img
                        className='w-10 h-10 rounded mr-3 max-sm:hidden object-cover'
                        src={company?.image || assets.default_avatar}
                        alt='User avatar'
                      />
                      <span className='text-base'>
                        {company?.name || "Unknown"}
                      </span>
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {company?.email}
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {company?.phone}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ListOfCompany;
