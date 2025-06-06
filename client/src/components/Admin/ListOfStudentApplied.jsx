import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Loading from "../Loading";
import { assets } from "../../assets/assets";
import React from "react";

const ListOfStudentApplied = () => {
  const { backendUrl, adminToken } = useContext(AppContext);
  const [listStudent, setListStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);

  const fetchListOfStudent = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/list-of-student-applied",
        {
          headers: { Authorization: "Bearer " + adminToken },
        }
      );
      console.log(data.listStudent);
      if (data.success) {
        setListStudent(data.listStudent);
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
      fetchListOfStudent();
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
                <th className='py-7 px-3 sm:px-4 text-left w-[5%] text-base font-semibold'>
                  S No.
                </th>
                {/* <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Registration
                </th> */}
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Student Name
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Company Name
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Job Title
                </th>
                <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {listStudent.length === 0 ? (
                <tr>
                  <td
                    colSpan='3'
                    className='py-8 text-center text-gray-500 text-lg'
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                listStudent.map((student, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='py-5 px-3 sm:px-4 border-b text-center text-base'>
                      {index + 1}
                    </td>
                    {/* <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {student?.userId?.registration}
                    </td> */}
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {student?.userId?.name || "Unknown"}
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {student?.companyId?.name}
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {student?.jobId?.title}
                    </td>
                    <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                      {student?.status}
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

export default ListOfStudentApplied;
