import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
    const { id } = useParams(); // Get employee ID from URL parameters
    const navigate = useNavigate(); // For navigating between pages

    const [employee, setEmployee] = useState(null); // Store employee data
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(true); // For loading state
    const [errors, setErrors] = useState({}); // For storing validation errors

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            setLoading(true); // Start loading when fetching begins
            try {
                const response = await axios.get(`http://localhost/Backend/api/employeeDetails.php?id=${id}`);
                const data = response.data;

                if (response.status === 200 && data && data.id) {
                    setEmployee(data);
                    setFormData({
                        username: data.username || '',
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                    });
                } else {
                    console.error('Employee not found:', data);
                    alert('Employee not found.');
                    navigate('/admin/adminEm/employ'); // Navigate back if employee is not found
                }
            } catch (error) {
                console.error('Error fetching employee details:', error.response ? error.response.data : error.message);
                alert('Failed to load employee details. Please check your connection or try again later.');
                navigate('/admin/adminEm/employ');
            } finally {
                setLoading(false); // Stop loading after fetch completes
            }
        };

        if (id) { // Ensure id is defined before fetching
            fetchEmployeeDetails();
        } else {
            alert('Invalid employee ID.');
            navigate('/admin/adminEm/employ');
        }
    }, [id, navigate]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value); // Validate on change
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'name') {
            const namePattern = /^[a-zA-Z\s]+$/;
            if (!namePattern.test(value)) {
                error = 'Full name can only contain letters and spaces.';
            }
        } else if (name === 'phone') {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(value)) {
                error = 'Phone number must be 10 digits.';
            }
        } else if (name === 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailPattern.test(value)) {
                error = 'Email must be a valid Gmail address.';
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) {
            alert('Please fix the errors before submitting.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost/Backend/api/employeeDetails.php?id=${id}`, {
                ...formData,
                update: true,
            });
            if (response.status === 200) {
                alert('Employee updated successfully');
                navigate('/admin/adminEm/employ');
            }
        } catch (error) {
            console.error('Error updating employee details:', error);
            alert('Failed to update employee details.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await axios.post(`http://localhost/Backend/api/employeeDetails.php?id=${id}`, {
                    delete: true,
                });
                if (response.status === 200) {
                    alert('Employee deleted successfully');
                    navigate('/admin/adminEm/employ');
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!employee) return <div>Employee not found.</div>;

    return (
        <div className="employee-details">
            <h1>Employee Details</h1>
            <form onSubmit={handleUpdate} className="employdetailform">
                <div>
                    <label>Employee ID</label>
                    <input type="text" value={employee.id} readOnly />
                </div>
                <div>
                    <label>Username</label>
                    <input  
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <div className="error">{errors.phone}</div>}
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="bn">
                    <button type="submit" name='Adbn'className="btn-update">Update</button>
                    <button type="button" name='Bdbn'className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </form>

            <div className="back-links">
                <a href="/admin/adminEm" className="back-button">Back to Admin</a>
                <a href="/admin/adminEm/employ" className="back-button">Back to Employee List</a>
            </div>
        </div>
    );
};

export default EmployeeDetails;
