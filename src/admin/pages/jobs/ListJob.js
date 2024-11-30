import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit, Add } from "@mui/icons-material";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import "./List.css";

export default function ListJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await axios.get("http://localhost/Backend/api/indexjob.php");
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost/Backend/api/deletejob.php?delete=${id}`);
        setJobs(jobs.filter((job) => jobs.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const columns = [
    { field: "jobId", headerName: "Job ID", width: 100 },
    { field: "jobTitle", headerName: "Job Title", width: 150 },
    { field: "experience", headerName: "Experience", width: 120 },
    { field: "salary", headerName: "Salary", width: 100 },
    { field: "jobType", headerName: "Job Type", width: 150 },
    { field: "keyResponsibilities", headerName: "Responsibilities", width: 200 },
    { field: "requirements", headerName: "Requirements", width: 200 },
    { field: "benefits", headerName: "Benefits", width: 200 },
    { field: "content1", headerName: "Content 1", width: 200 },
    { field: "content2", headerName: "Content 2", width: 200 },
    {
      field: "image1",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          src={`http://localhost/Backend/images/${params.row.jobId}/${params.row.image1}`}
          alt={params.row.jobTitle}
        />
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`/admin/jobs/job/${params.row.id}/edit`}>
            <Edit className="action-icon mx-1" />
          </Link>
          <DeleteOutline
            className="action-icon mx-1"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Error fetching jobs!</Typography>;

  return (
    <div className="jobsList">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          /*sx={{background:'#c30010'}}*/
          startIcon={<Add />}
          component={Link}
          to="/admin/jobs/job/create"
        >
          Add Job
        </Button>
      </Box>
      <DataGrid
        rows={jobs}
        columns={columns}
        pageSize={8}
        disableRowSelectionOnClick
        checkboxSelection
        rowHeight={60}
      />
    </div>
  );
}