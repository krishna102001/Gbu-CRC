import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const AddStudent = () => {
  const [fileData, setFileData] = useState(null);
  const inputRef = useRef();
  const { backendUrl, adminToken } = useContext(AppContext);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch(`${backendUrl}/api/admin/get-students-record`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setStudents(result.data);
      });
  }, []);
  const handleSubmitData = async () => {
    console.log(fileData);
    try {
      if (!fileData) {
        toast.error("Please select a student record file.");
        return;
      }
      const formData = new FormData();
      formData.append("file", fileData);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-students-record`,
        formData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setFileData(null);
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
      inputRef.current.target.innerHTML = "";
    }
  };
  return (
    <div className='mt-4 '>
      <div className='flex flex-col md:flex-row md:items-center justify-start'>
        <input
          type='file'
          onChange={(e) => setFileData(e.target.files[0])}
          ref={inputRef}
        />
        <button
          className='bg-[#1e40af] text-white px-4 py-2 rounded-md hover:shadow-md hover:shadow-[#1e20afe8] mt-4 md:mt-0'
          onClick={handleSubmitData}
        >
          Submit
        </button>
      </div>
      <div className='overflow-x-auto w-full rounded-xl shadow-lg mt-5 '>
        <table className='w-full bg-white border-collapse border-gray-300 rounded-xl'>
          <thead className='bg-[#f2f2f2] text-primary'>
            <tr className='border-gray-300 rounded-xl'>
              <th className='py-7 px-3 sm:px-4 text-left w-[5%] text-base font-semibold'>
                S No.
              </th>
              <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                Registration
              </th>
              <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                Student Name
              </th>
              <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                Branch
              </th>
              <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                Email Id
              </th>
              <th className='py-7 px-3 sm:px-4 text-left max-sm:hidden w-[15%] text-base font-semibold'>
                Phone No.
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan='3'
                  className='py-8 text-center text-gray-500 text-lg'
                >
                  No students found
                </td>
              </tr>
            ) : (
              students?.map((student, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-5 px-3 sm:px-4 border-b text-center text-base'>
                    {index + 1}
                  </td>
                  <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                    {student?.registration}
                  </td>
                  <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                    {student?.name || "Unknown"}
                  </td>
                  <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                    {student?.branch || "Unknown"}
                  </td>
                  <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                    {student?.email || "Unknown"}
                  </td>
                  <td className='py-5 px-3 sm:px-4 border-b max-sm:hidden text-base'>
                    {student?.phone || "Unknown"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddStudent;
