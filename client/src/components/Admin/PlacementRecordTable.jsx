import React from "react";
const PlacementRecordTable = ({ records, onEditHandler, onDeleteHandler }) => {
  return (
    <div className='mt-8'>
      <h2 className='text-xl font-semibold mb-4'>Placement Records</h2>
      {records?.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4 border'>Session</th>
              <th className='py-2 px-4 border'>Companies</th>
              <th className='py-2 px-4 border'>Applied</th>
              <th className='py-2 px-4 border'>Placed</th>
              <th className='py-2 px-4 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records?.map((record) => (
              <tr key={record._id} className='text-center'>
                <td className='py-2 px-4 border'>{record.session}</td>
                <td className='py-2 px-4 border'>{record.numberOfCompanies}</td>
                <td className='py-2 px-4 border'>
                  {record.numberOfStudentsApplied}
                </td>
                <td className='py-2 px-4 border'>
                  {record.numberOfStudentsPlaced}
                </td>
                <td className='py-2 px-4 border'>
                  <button
                    onClick={() => onEditHandler(record)}
                    className='bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteHandler(record._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlacementRecordTable;
