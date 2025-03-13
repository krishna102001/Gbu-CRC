import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registering required chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PlacementRecords = () => {
  const [records, setRecords] = useState([]);
  const { backendUrl } = useContext(AppContext);

  const fetchPlacementRecords = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/get-placement-record"
      );
      if (data.success) {
        setRecords(data.placementRecord);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchPlacementRecords();
  }, []);

  // Bar chart data
  const barData = {
    labels: records.map((r) => r.session),
    datasets: [
      {
        label: "No. of Companies",
        data: records.map((r) => r.numberOfCompanies),
        backgroundColor: "rgba(75,192,192,0.8)",
        borderRadius: 5,
      },
      {
        label: "No. of Students Applied",
        data: records.map((r) => r.numberOfStudentsApplied),
        backgroundColor: "rgba(55,162,232,0.8)",
        borderRadius: 5,
      },
      {
        label: "No. of Students Placed",
        data: records.map((r) => r.numberOfStudentsPlaced),
        backgroundColor: "rgba(153,102,255,0.8)",
        borderRadius: 5,
      },
    ],
  };

  // Pie chart data (based on first record or latest)
  const pieData =
    records.length > 0
      ? {
          labels: ["Students Applied", "Students Placed"],
          datasets: [
            {
              data: [
                records[0].numberOfStudentsApplied,
                records[0].numberOfStudentsPlaced,
              ],
              backgroundColor: ["#FF6384", "#36A2EB"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        }
      : {
          labels: [],
          datasets: [],
        };

  // Chart options to display title
  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Companies vs Students Placed (Session-wise)",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Students Applied vs Placed (Latest Session)",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className='py-10 px-5 md:px-10'>
      <h2 className='text-2xl font-bold text-center mb-10'>
        Placement Statistics
      </h2>

      {/* Responsive Layout for Charts */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-8'>
        {/* Bar Graph */}
        <div className='w-full md:w-1/2 h-[400px] shadow-md p-4 bg-white rounded-lg'>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart */}
        <div className='w-full md:w-1/2 h-[400px] shadow-md p-4 bg-white rounded-lg text-center'>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <h3 className='text-xl font-semibold mt-12 mb-4'>
        Placement Records Table
      </h3>
      <div className='overflow-x-auto shadow-md rounded-lg'>
        <table className='min-w-full border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 border'>Session</th>
              <th className='px-4 py-2 border'>No. of Companies</th>
              <th className='px-4 py-2 border'>Students Applied</th>
              <th className='px-4 py-2 border'>Students Placed</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className='text-center'>
                  <td className='px-4 py-2 border'>{record.session}</td>
                  <td className='px-4 py-2 border'>
                    {record.numberOfCompanies}
                  </td>
                  <td className='px-4 py-2 border'>
                    {record.numberOfStudentsApplied}
                  </td>
                  <td className='px-4 py-2 border'>
                    {record.numberOfStudentsPlaced}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center px-4 py-4'>
                  No records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementRecords;
