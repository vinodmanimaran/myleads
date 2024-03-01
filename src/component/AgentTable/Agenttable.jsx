import React, { useEffect, useState } from 'react';
import { CircularProgress} from '@mui/material';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    border: '1px solid red',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '& .MuiPaper-root': {
      border: 'none',
    },
    '& .MuiToolbar-root': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#f5f5f5',
    },
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #e0e0e0',
    },
  },
});


const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";


const Agenttable = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const classes = useStyles();

useEffect(() => {
  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${API_URL}/agent/getallagent`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      });

      setAgents(response.data.agents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Error fetching agents. Please try again later.');
      setLoading(false);
    }
  };

  fetchAgents();
}, []);


  const columns = [

    {
      name:"agentId",
      label:"agentId"
    },
    {
      name: "name",
      label: "Name"
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "contactNumber",
      label: "Contact Number"
    },
    {
      name: "location",
      label: "Location"
    },
    {
      name: "qrCode",
      label: "QR Code",
      options: {
        customBodyRender: (value) => (
          <img src={value} alt={`QR Code`} style={{ width: "80px" }} />
        )
      }
    }
  ];

  if (loading) return <CircularProgress />;

  if (error) return <div>{error}</div>;

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    pagination: true,
    selectableRows: 'none', 
    rowsPerPage: 10, 
    rowsPerPageOptions: [5, 10, 20],
    download: true,
    print: true,
    viewColumns: false,
    search: true,
    sort: true,
    serverSide: false,
  };

  return (
    <div className={useStyles}>
      <MUIDataTable
        data={agents}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default Agenttable;
