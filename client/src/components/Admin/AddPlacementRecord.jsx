import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import PlacementRecordTable from "./PlacementRecordTable";

const AddPlacementRecord = () => {
  const [records, setRecords] = useState([]);
  const [session, setSession] = useState("");
  const [numberOfCompanies, setNumberOfCompanies] = useState(0);
  const [numberOfStudentsApplied, setNumberOfStudentsApplied] = useState(0);
  const [numberOfStudentsPlaced, setNumberOfStudentsPlaced] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { backendUrl, adminToken } = useContext(AppContext);

  const cleanup = () => {
    setSession("");
    setNumberOfCompanies(0);
    setNumberOfStudentsApplied(0);
    setNumberOfStudentsPlaced(0);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      session,
      numberOfCompanies,
      numberOfStudentsPlaced,
      numberOfStudentsApplied,
    };
    if (isEdit) {
      //   alert(editId);
      try {
        const { data } = await axios.put(
          backendUrl + `/api/admin/edit-placement-record/${editId}`,
          payload,
          {
            headers: { Authorization: "Bearer " + adminToken },
          }
        );
        if (data.success) {
          toast.success(data.message);
          cleanup();
          setIsEdit(false);
          fetchPlacementRecord();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/admin/add-placement-record",
          payload,
          {
            headers: { Authorization: "Bearer " + adminToken },
          }
        );
        if (data.success) {
          toast.success(data.message);
          cleanup();
          fetchPlacementRecord();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // implementation is needed
  const onEditHandler = (record) => {
    setSession(record.session);
    setNumberOfCompanies(record.numberOfCompanies);
    setNumberOfStudentsApplied(record.numberOfStudentsApplied);
    setNumberOfStudentsPlaced(record.numberOfStudentsPlaced);
    setIsEdit(true);
    setEditId(record._id);
  };
  // implementation is needed
  const onDeleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/admin/delete-placement-record/${id}`,
        {
          headers: { Authorization: "Bearer " + adminToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchPlacementRecord();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchPlacementRecord = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/get-placement-record"
      );
      if (data.success) {
        setRecords(data.placementRecord);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPlacementRecord();
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
      <form
        onSubmit={onSubmitHandler}
        className='container p-6 bg-white rounded-lg shadow-md'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Placement Session */}
          <div className='w-full'>
            <label className='block text-md font-medium text-primary mb-2'>
              Placement Session
            </label>
            <input
              type='text'
              placeholder='2024-2025'
              onChange={(e) => setSession(e.target.value)}
              value={session}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none transition duration-300 ease-in-out'
            />
          </div>

          {/* No. Of Company Visited */}
          <div className='w-full'>
            <label className='block text-md font-medium text-primary mb-2'>
              No. Of Company Visited
            </label>
            <input
              min={0}
              type='number'
              placeholder='25'
              onChange={(e) => setNumberOfCompanies(e.target.value)}
              value={numberOfCompanies}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none transition duration-300 ease-in-out'
            />
          </div>

          {/* No. Of Student Applied */}
          <div className='w-full'>
            <label className='block text-md font-medium text-primary mb-2'>
              No. Of Student Applied
            </label>
            <input
              min={0}
              type='number'
              placeholder='25'
              onChange={(e) => setNumberOfStudentsApplied(e.target.value)}
              value={numberOfStudentsApplied}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none transition duration-300 ease-in-out'
            />
          </div>

          {/* No. Of Student Placed */}
          <div className='w-full'>
            <label className='block text-md font-medium text-primary mb-2'>
              No. Of Student Placed
            </label>
            <input
              min={0}
              type='number'
              placeholder='25'
              onChange={(e) => setNumberOfStudentsPlaced(e.target.value)}
              value={numberOfStudentsPlaced}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none transition duration-300 ease-in-out'
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full sm:w-32 px-6 py-3 bg-primary font-primary text-white rounded-md hover:bg-gray-800 outline-none transition duration-300 ease-in-out'
          >
            {isEdit ? "Edit" : "Add"}
          </button>
        </div>
      </form>

      <PlacementRecordTable
        records={records}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </motion.div>
  );
};

export default AddPlacementRecord;
