import { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import React from "react";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const statusOptions = [
    { label: "Accepted", value: "accepted", color: "text-green-600" },
    { label: "Rejected", value: "rejected", color: "text-red-600" },
    { label: "Under Review", value: "under-review", color: "text-yellow-600" },
    { label: "Pending", value: "pending", color: "text-gray-600" },
  ];

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { Authorization: `Bearer ${companyToken}` } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
        toast.success(`Application ${status.replace("-", " ")} successfully`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown !== null &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

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
      viewport={{ once: true }}
    >
      <div className='container mx-auto p-4'>
        <div className='w-full rounded-xl shadow-lg'>
          <table className='w-full bg-white border-collapse border-gray-300 rounded-xl'>
            <thead className='bg-[#f2f2f2] text-primary'>
              <tr className='border-gray-300 rounded-xl'>
                <th className='py-7 px-3 text-left text-base font-semibold'>
                  #
                </th>
                <th className='py-7 px-3 text-left text-base font-semibold'>
                  User name
                </th>
                <th className='py-7 px-3 text-left text-base font-semibold max-sm:hidden'>
                  Job Title
                </th>
                <th className='py-7 px-3 text-left text-base font-semibold max-sm:hidden'>
                  Location
                </th>
                <th className='py-7 px-3 text-left text-base font-semibold'>
                  Resume
                </th>
                <th className='py-7 px-3 text-left text-base font-semibold'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.length === 0 ? (
                <tr>
                  <td
                    colSpan='6'
                    className='py-8 text-center text-gray-500 text-lg'
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                applicants.map((applicant, index) => {
                  const isDropdownOpen = activeDropdown === index;
                  const dropdownStyle = {};

                  if (dropdownRefs.current[index]) {
                    const rect =
                      dropdownRefs.current[index].getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (rect.bottom + 120 > viewportHeight) {
                      dropdownStyle.bottom = "100%";
                      dropdownStyle.top = "auto";
                      dropdownStyle.marginBottom = "0.5rem";
                    } else {
                      dropdownStyle.top = "100%";
                      dropdownStyle.marginTop = "0.5rem";
                    }
                  }

                  return (
                    <tr
                      key={index}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-5 px-3 border-b text-center text-base'>
                        {index + 1}
                      </td>
                      <td className='py-5 px-3 border-b flex items-center'>
                        <img
                          className='w-10 h-10 rounded mr-3 max-sm:hidden object-cover'
                          src={applicant.userId?.image || assets.default_avatar}
                          alt='User avatar'
                        />
                        <span className='text-base'>
                          {applicant.userId?.name || "Unknown"}
                        </span>
                      </td>
                      <td className='py-5 px-3 border-b max-sm:hidden text-base'>
                        {applicant.jobId?.title || "N/A"}
                      </td>
                      <td className='py-5 px-3 border-b max-sm:hidden text-base'>
                        {applicant.jobId?.location || "Remote"}
                      </td>
                      <td className='py-5 px-3 border-b'>
                        <a
                          href={`${applicant.resumeId?.resume.replace(
                            "/upload/",
                            "/upload/fl_attachment:resume/"
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='bg-blue-50 text-primary px-4 py-2 rounded-md flex items-center gap-2 text-base hover:bg-blue-100 transition-colors w-full'
                        >
                          Resume
                          <img
                            className='w-5 h-5'
                            src={assets.resume_download_icon}
                            alt='Download'
                          />
                        </a>
                      </td>
                      <td
                        className='py-5 px-3 border-b relative'
                        ref={(el) => (dropdownRefs.current[index] = el)}
                      >
                        <div className='relative inline-block text-left'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(isDropdownOpen ? null : index);
                            }}
                            className='text-gray-600 hover:text-gray-800 text-2xl'
                          >
                            ⋯
                          </button>

                          {isDropdownOpen && (
                            <div
                              className='absolute z-50 w-40 bg-white border border-gray-200 rounded-md shadow-lg'
                              style={{ ...dropdownStyle, right: 0 }}
                            >
                              {statusOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    changeJobApplicationStatus(
                                      applicant._id,
                                      option.value
                                    );
                                    setActiveDropdown(null);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 border-b last:border-b-0 ${option.color}`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}

                          <div
                            className={`mt-2 inline-block px-3 py-1 rounded text-sm font-medium ${
                              applicant.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : applicant.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : applicant.status === "under-review"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {applicant.status
                              ?.replace("-", " ")
                              ?.replace(/\b\w/g, (l) => l.toUpperCase()) ||
                              "Pending"}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewApplications;
