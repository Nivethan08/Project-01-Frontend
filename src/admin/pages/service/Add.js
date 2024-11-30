// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";

// // Optional: Create a custom style object for red colors
// const styles = {
//   redText: {
//     color: "red",
//   },
//   redButton: {
//     backgroundColor: "red",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "#b30000", // Darker red on hover
//     },
//   },
// };

// const AddService = () => {
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     serviceId: '',
//     serviceName: '',
//     content: '',
//     image1: null,
//   });

//   const handleChange = (event) => {
//     const { name, value, type, files } = event.target;
//     setInputs((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('serviceId', inputs.serviceId);
//     formData.append('serviceName', inputs.serviceName);
//     formData.append('content', inputs.content);
//     formData.append('image1', inputs.image1);

//     try {
//       const response = await axios.post('http://localhost/Backend/api/index.php', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       navigate('/services'); // Navigate to your services list or any other page
//     } catch (error) {
//       console.error("There was an error!", error);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" align="center" sx={styles.redText} gutterBottom>
//         Add New Service
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <TextField
//           fullWidth
//           id="serviceId"
//           name="serviceId"
//           label="Service ID"
//           value={inputs.serviceId}
//           onChange={handleChange}
//           required
//           sx={styles.redText}
//         />
//         <TextField
//           fullWidth
//           id="serviceName"
//           name="serviceName"
//           label="Service Name"
//           value={inputs.serviceName}
//           onChange={handleChange}
//           required
//           sx={styles.redText}
        
//         />
//         <TextField
//           fullWidth
//           id="content"
//           name="content"
//           label="Content"
//           value={inputs.content}
//           onChange={handleChange}
//           required
//           multiline
//           rows={4}
//           sx={styles.redText}
         
//         />
//         <input
//           type="file"
//           id="image1"
//           name="image1"
//           onChange={handleChange}
//           style={{ marginTop: "16px" }}
//         />
//         <Box textAlign="center" sx={{ mt: 2 }}>
//           <Button type="submit" variant="contained" sx={styles.redButton}>
//             Add Service
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddService;
