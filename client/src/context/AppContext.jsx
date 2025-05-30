import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false); // Changed setter to camelCase

  const [jobs, setJobs] = useState([]);

  const [showUserLogin, setShowUserLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userApplications, setUserApplications] = useState(null);

  // edit should be made
  const [adminToken, setAdminToken] = useState("");
  const [adminData, setAdminData] = useState("");
  const [isAdminLogged, setIsAdminLogged] = useState(false);

  // Function to Fetch Jobs data
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");

      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch Compnay Data
  // Function to fetch Compnay Data
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/company/company", {
        headers: { Authorization: `Bearer ${companyToken}` },
      });
      const data = response.data;
      console.log(data); // Move the console.log statement here

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch User Data
  const fetchUserData = async () => {
    try {
      // const token = await getToken();
      const token = userToken;

      const { data } = await axios.get(backendUrl + "/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch User's  Applied data
  const fetchUserApplications = async () => {
    try {
      // const token = await getToken();
      const token = userToken;

      const { data } = await axios.get(backendUrl + "/api/users/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if (companyData) {
      const storedCompanyData = JSON.stringify(companyData);
      localStorage.setItem("companyData", storedCompanyData);
    }
  }, [companyData]);

  useEffect(() => {
    const storedCompanyData = localStorage.getItem("companyData");
    if (storedCompanyData) {
      setCompanyData(JSON.parse(storedCompanyData));
    }
  }, []);

  // useEffect(() => {
  //   if (adminToken) {
  //     fetchAdminData();
  //   }
  // }, [adminToken]);

  useEffect(() => {
    if (adminData) {
      const storedAdminData = JSON.stringify(adminData);
      localStorage.setItem("adminData", storedAdminData);
      const storedIsAdminLogged = JSON.stringify(isAdminLogged);
      localStorage.setItem("isAdminLogged", storedIsAdminLogged);
    }
  }, [adminData]);

  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");
    const storedIsAdminLogged = localStorage.getItem("isAdminLogged");
    const storedAdminToken = localStorage.getItem("adminToken");
    if (storedAdminToken) {
      setAdminToken(storedAdminToken);
    }
    if (storedIsAdminLogged) {
      setIsAdminLogged(JSON.parse(storedIsAdminLogged));
    }
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [userToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    setIsSearched,
    isSearched,
    jobs,
    setJobs,
    setShowUserLogin,
    showUserLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
    setUserToken,
    userToken,
    adminData,
    adminToken,
    setAdminToken,
    setAdminData,
    isAdminLogged,
    setIsAdminLogged,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
