import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateAgent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    location: ''
  });
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.contactNumber || !formData.location) {
        setError('All fields are required');
        return;
      }
      const response = await axios.post('http://localhost:4040/agent/createagents', formData);
      console.log(response.data); 
      toast.success("Agent Created successfully")
      handleClose();
    } catch (error) {
      console.error('Error creating agent:', error);
      toast.error('Error creating agent');
      setError('An error occurred while creating the agent');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create a New Agent</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default CreateAgent;
