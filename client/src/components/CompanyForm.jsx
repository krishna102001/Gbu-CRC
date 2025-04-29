import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const { backendUrl, companyToken, setCompanyData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.image) newErrors.image = "Logo image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("image", formData.image); // <-- File

    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/register/company",
        formDataToSend,
        {
          headers: { Authorization: `Bearer ${companyToken}` },
        }
      );
      if (data.success) {
        console.log(data);
        setCompanyData(data.company);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return;
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
      <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl'>
        <h2 className='text-2xl font-semibold text-center mb-6 text-gray-800'>
          Company Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className='space-y-5'
          encType='multipart/form-data'
        >
          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Company Name
            </label>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Phone
            </label>
            <input
              type='text'
              name='phone'
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.phone && (
              <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Company Logo
            </label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200'
            />
            {errors.image && (
              <p className='text-red-500 text-sm mt-1'>{errors.image}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
