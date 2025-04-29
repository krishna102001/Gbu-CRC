import Quill from "quill";
import { useContext, useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import React from "react";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Junior Level");
  const [salary, setSalary] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { Authorization: `Bearer ${companyToken}` },
      });
      if (data.success) setJobs(data.jobsData);
    } catch (err) {
      toast.error("Failed to fetch jobs.");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      if (!isEdit) {
        const { data } = await axios.post(
          backendUrl + "/api/company/post-job",
          { title, description, location, category, level, salary },
          { headers: { Authorization: `Bearer ${companyToken}` } }
        );

        if (data.success) {
          fetchJobs();
          toast.success(data.message);
          setTitle("");
          setSalary(0);
          quillRef.current.root.innerHTML = "";
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.put(
          `${backendUrl}/api/company/edit-job/${editingJobId}`,
          { title, description, location, category, level, salary },
          { headers: { Authorization: `Bearer ${companyToken}` } }
        );
        if (data.success) {
          fetchJobs();
          toast.success(data.message);
          setTitle("");
          setSalary(0);
          quillRef.current.root.innerHTML = "";
          setIsEdit(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    // Initiate Quill only Once
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const handleEdit = (job) => {
    setTitle(job.title);
    setLocation(job.location);
    setCategory(job.category);
    setLevel(job.level);
    setSalary(job.salary);
    quillRef.current.root.innerHTML = job.description;
    setEditingJobId(job._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <form
        onSubmit={onSubmitHandler}
        className='container p-6 bg-white rounded-lg shadow-md'
      >
        <div className='space-y-6'>
          {/* Job Title */}
          <div>
            <label className='block text-md font-medium text-primary mb-2'>
              Job Title
            </label>
            <input
              type='text'
              placeholder='Type here'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary  outline-none  transition duration-300 ease-in-out'
            />
          </div>

          {/* Job Description */}
          <div>
            <label className='block text-md font-medium text-primary mb-2'>
              Job Description
            </label>
            <div
              ref={editorRef}
              className='w-full border border-gray-300 rounded-md min-h-[150px] p-2 '
            ></div>
          </div>

          {/* Job Details Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {/* Job Category */}
            <div>
              <label className='block text-md font-medium text-primary mb-2'>
                Job Category
              </label>
              <select
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary  outline-none  transition duration-300 ease-in-out'
                onChange={(e) => setCategory(e.target.value)}
              >
                {JobCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Location */}
            <div>
              <label className='block text-sm font-medium text-primary mb-2'>
                Job Location
              </label>
              <select
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary  outline-none  transition duration-300 ease-in-out'
                onChange={(e) => setLocation(e.target.value)}
              >
                {JobLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Level */}
            <div>
              <label className='block text-sm font-medium text-primary mb-2'>
                Job Level
              </label>
              <select
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary  outline-none  transition duration-300 ease-in-out'
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value='Beginner level'>Beginner level</option>
                <option value='Intermediate level'>Intermediate level</option>
                <option value='Senior level'>Senior level</option>
              </select>
            </div>
          </div>

          {/* Job Salary */}
          <div className='w-full sm:w-48'>
            <label className='block text-sm font-medium text-primary mb-2'>
              Job Salary
            </label>
            <input
              min={0}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary  outline-none  transition duration-300 ease-in-out'
              onChange={(e) => setSalary(e.target.value)}
              type='number'
              placeholder='2,500'
              value={salary}
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full sm:w-32 px-6 py-3 bg-primary font-primary text-white rounded-md hover:bg-gray-800  outline-none  transition duration-300 ease-in-out'
          >
            {isEdit ? "Edit" : "Add"}
          </button>
        </div>
      </form>

      {/* Job List */}
      <div className='mt-10 p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4 text-primary'>Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <table className='w-full table-auto border'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-2'>Title</th>
                <th className='p-2'>Category</th>
                <th className='p-2'>Location</th>
                <th className='p-2'>Level</th>
                <th className='p-2'>Salary</th>
                <th className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className='border-t'>
                  <td className='p-2'>{job.title}</td>
                  <td className='p-2'>{job.category}</td>
                  <td className='p-2'>{job.location}</td>
                  <td className='p-2'>{job.level}</td>
                  <td className='p-2'>{job.salary}</td>
                  <td className='p-2 space-x-2'>
                    <button
                      onClick={() => {
                        handleEdit(job);
                        setIsEdit(true);
                      }}
                      className='px-3 py-1 bg-blue-500 text-white rounded-md'
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default AddJob;
