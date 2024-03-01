import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

const DashboardTable = () => {
  const [data, setData] = useState([]);
  const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        const revenueChartData = response.data?.data || {};
        setData(generateRows(revenueChartData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const generateRows = (data) => {
    const rows = [];
    for (const serviceName in data) {
      if (Array.isArray(data[serviceName])) {
        data[serviceName].forEach(item => {
          const row = { id: rows.length + 1, Service: serviceName };
          for (const field in item) {
            if (!['_id', 'updatedAt', '__v'].includes(field)) {
              if (field === 'createdAt') {
                const createdAtDate = new Date(item[field]);
                row['Date'] = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
              } else {
                row[field] = item[field] || '';
              }
            }
          }
          rows.push(row);
        });
      }
    }
    return rows;
  };

  const columns = [
    { name: 'id', label: 'ID' },
    { name: 'agentId', label: 'Agent ID' },
    { name: 'Date', label: 'Date' },
    { name: 'Service', label: 'Service' },
    { name: 'name', label: 'Name' },
    { name: 'mobile', label: 'Mobile' },
    { name: 'alternate_number', label: 'Alternate Number' },
    { name: 'place', label: 'Place' },
    { name: 'district', label: 'District' },
    { name: 'amount', label: 'Amount' },
    { name: 'vehicle', label: 'Vehicle' },
    { name: 'purchaseOrSale', label: 'Purchase/Sale' },
    { name: 'agreeOrCommercial', label: 'Agree/Commercial' }
  ];

  const options = {
    filter: true,
    selectableRows: 'none',
    responsive: 'standard',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    serverSide: false,
    onColumnSortChange: (changedColumn, direction) => {
      console.log(`Sort changed: Column=${changedColumn}, Direction=${direction}`);
    }
  };

  return (
    <MUIDataTable
      title={"Dashboard Table"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DashboardTable;
