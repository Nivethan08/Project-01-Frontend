import { useEffect, useState } from "react";
import axios from "axios";
import "./ListCourse.css";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit, Add } from "@mui/icons-material"; 
import { IconButton, Box, Button } from "@mui/material"; // MUI components for buttons

export default function ListCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // State to hold selected rows

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost/Backend/api/index.php");
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axios.get(`http://localhost/Backend/api/deleteCourse.php?delete=${id}`);
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete selected courses?");
    if (confirmDelete) {
      try {
        await Promise.all(selectedRows.map(id => 
          axios.get(`http://localhost/Backend/api/deleteCourse.php?delete=${id}`)
        ));
        // Update courses by filtering out the deleted ones
        setCourses(courses.filter(course => !selectedRows.includes(course.id)));
        setSelectedRows([]); // Clear selection after deletion
      } catch (error) {
        console.error("Error deleting selected courses:", error);
      }
    }
  };

  const columns = [
    { field: "courseId", headerName: "Course ID", width: 100 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "courseDuration", headerName: "Duration", width: 120 },
    { field: "courseFee", headerName: "Fee", width: 100 },
    {
      field: "content1",
      headerName: "Content1",
      width: 200,
    },
    {
      field: "content2",
      headerName: "Content2",
      width: 200,
    },
    {
      field: "image1",
      headerName: "Image 1",
      width: 120,
      renderCell: (params) => (
        <img
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
          src={`http://localhost/Backend/images/${params.row.courseId}/${params.row.image1}`}
          alt={params.row.courseName}
        />
      ),
    },
    {
      field: "image2",
      headerName: "Image 2",
      width: 120,
      renderCell: (params) => (
        <img
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
          src={`http://localhost/Backend/images/${params.row.courseId}/${params.row.image2}`}
          alt={params.row.courseName}
        />
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`course/${params.row.id}/edit`}>
            <IconButton size="small" color="primary">
              <Edit />
            </IconButton>
          </Link>
          <IconButton size="small" color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteOutline />
          </IconButton>
        </>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching courses!</p>;

  return (
    <div className="coursesList">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          component={Link}
          to="course/create"
        >
          Add Course
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0} // Disable if no rows are selected
        >
          Delete Selected
        </Button>
      </Box>
      <DataGrid
        rows={courses}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        rowHeight={80} // Increase row height for better visibility of images
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection); // Update selected rows
        }}
        sx={{
          bgcolor: 'white', // Set the background color to white
          '& .MuiDataGrid-cell': {
            bgcolor: 'white', // Ensure all cells have a white background
          },
          '& .MuiDataGrid-header': {
            bgcolor: 'white', // Ensure the header has a white background
          },
        }}
      />
    </div>
  );
}
