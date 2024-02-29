import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';

const DashboardTable = () => {
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState('Service');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard');
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
                // Convert createdAt to date/month/year format
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const allFields = [
    'id',
    'Date',
    'Service',
    'name',
    'mobile',
    'alternate_number',
    'place',
    'district',
    'amount',

    'vehicle',
    'purchaseOrSale',
    'agreeOrCommercial'
  ];

  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {allFields.map(field => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSortRequest(field)}
                  >
                    {field}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {allFields.map(field => (
                    <TableCell key={field}>{row[field]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DashboardTable;
