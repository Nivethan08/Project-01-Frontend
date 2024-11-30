import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from MUI


const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get('http://localhost/Backend/api/leaveTypes.php');
      setLeaveTypes(response.data);
    } catch (error) {
      console.error("Error fetching leave types:", error);
      setError("Failed to fetch leave types.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLeaveType = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      try {
        const formData = new FormData();
        formData.append('delete', id);

        const response = await axios.post('http://localhost/Backend/api/leaveTypes.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);

        if (response.data && response.data.success) {
          alert(response.data.message);
          setLeaveTypes((prevLeaveTypes) => prevLeaveTypes.filter((type) => type.id !== id));
        } else {
          alert("Failed to delete leave type. " + (response.data.message || 'Unknown error.'));
        }
      } catch (error) {
        console.error("Error deleting leave type:", error);
        alert("Error deleting the leave type. Please try again.");
      }
    }
  };

  const columns = [
    { field: 'id', headerName: '#', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'leave_type', headerName: 'Leave Type', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <a href={`/admin/adminEm/edit/${params.row.id}`} className="btn btn-edit" style={{ color: 'blue', marginRight: 8 }}>
            <i className="fas fa-edit"></i>
          </a>
          <a href="#" className="btn btn-delete" onClick={(e) => { e.preventDefault(); deleteLeaveType(params.row.id); }} style={{ color: 'red' }}>
            <i className="fas fa-trash-alt"></i>
          </a>
        </>
      )
    }
  ];

  return (
    <div>
      <a href="/admin/adminEm/addleaveType" style={{ color: 'green', fontSize: '20px' }}>
        <i className="fas fa-plus-circle" style={{ fontSize: '24px' }}></i> Add New
      </a>
      <a href="/admin/adminEm" className="back-button">Back to Admin</a>
      <h1>Leave Types</h1>
      {loading ? (
        <p>Loading leave types...</p>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          {error && <p className="error">{error}</p>}
          <DataGrid
            rows={leaveTypes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            getRowId={(row) => row.id} // Ensure that each row has a unique 'id'
          />
        </div>
      )}
    </div>
  );
};

export default LeaveTypes;