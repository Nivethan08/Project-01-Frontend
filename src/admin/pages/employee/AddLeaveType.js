import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF2E2E', // Red color
        },
        secondary: {
            main: '#B0BEC5', // Gray color
        },
        background: {
            default: '#FFFFFF', // White background
        },
    },
});

const AddLeaveType = () => {
    const [leaveType, setLeaveType] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); // State for success/error messages

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (leaveType) {
            if (window.confirm(`Are you sure you want to add this leave type: ${leaveType}?`)) {
                setLoading(true);

                try {
                    const formData = new URLSearchParams();
                    formData.append('leave_type', leaveType);

                    const response = await axios.post('http://localhost/Backend/api/addleaveType.php', formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    setMessage(response.data.message); // Set the message from the response
                    if (response.data.message === "Leave type added successfully!") {
                        setLeaveType(''); // Clear the input
                    }
                } catch (error) {
                    console.error("Error adding leave type:", error);
                    setMessage("There was an error adding the leave type. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        } else {
            setMessage("Please enter a leave type.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', backgroundColor: theme.palette.background.default }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="black">
                    Add New Leave Type
                </Typography>
                {message && <Alert severity={message === "Leave type added successfully!" ? "success" : "error"}>{message}</Alert>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        label="Leave Type"
                        variant="outlined"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Add Leave Type'}
                    </Button>
                </form>
                <br />
                <Button variant="outlined" color="secondary" href="/admin/adminEm/leaveTypes" style={{ textDecoration: 'none' }}>
                    Back to Leave Types
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default AddLeaveType;
