import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress} from '@mui/material';

// project imports
import SalesLineCard from './SalesLineCard';
import RevenuChartCard from './RevenuChartCard';
// import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import Table from 'component/Table/Table';

// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));

// ==============================|| DASHBOARD DEFAULT ||============================== //


const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";



const Default = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`, {
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
  
        // Since the response might be opaque due to CORS restrictions, 
        // you may not be able to directly read the response body.
        // Handle the response based on your API's behavior.
  
        console.log('Response:', response);
  
        // Example handling of response
        if (response.status === 200) {
          console.log('Request successful but response may be opaque.');
          // Handle response data accordingly
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  if (!dashboardData) {
    return <div>Loading...</div>; // or any loading indicator
  }


 



function generateChartData(data) {
    const leadsData = data?.jobs; // Added optional chaining to avoid accessing undefined
    if (!leadsData || leadsData?.length === 0) return null;

    const leadsPerDay = {};

    leadsData.forEach(lead => {
      const createdAt = new Date(lead.createdAt).toLocaleDateString();
      leadsPerDay[createdAt] = (leadsPerDay[createdAt] || 0) + 1; // Simplified the counting logic
    });

    const chartData = {
      labels: Object.keys(leadsPerDay),
      datasets: [
        {
          label: 'Leads Generation',
          data: Object.values(leadsPerDay)
        }
      ]
    };

    console.log(chartData)

    return chartData;
  }

  function calculateAverageLeadsPerDay(data) {
    if (!data || !data.data || !data.data.jobs || !data.leadsCount || !data.leadsCount.jobs) {
      console.log("Invalid data provided");
      return 0;
    }
  
    const jobs = data.data.jobs;
    const creationTimestamps = jobs.map(job => new Date(job.createdAt).getTime());
    
    const startDate = new Date(Math.min(...creationTimestamps));
    const endDate = new Date(Math.max(...creationTimestamps));
    
    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1; // Ensure minimum duration is 1 day
    
    const totalLeads = data.leadsCount.jobs || 0; // Ensure totalLeads is not null
    
    console.log("Total leads:", totalLeads);
    console.log("Duration in days:", durationInDays);
    const averageLeadsPerDay = totalLeads / durationInDays;
  
    console.log("Average leads per day:", averageLeadsPerDay.toFixed(2));
  
    return averageLeadsPerDay.toFixed(2);
  }
  
  // Assuming the rest of the code remains unchanged
  
  
  
  const getIcon = (service) => {
    switch (service) {
      case 'jobs':
        return MonetizationOnTwoToneIcon;
      case 'loans':
        return AccountBalanceTwoToneIcon;
      case 'creditCards':
        return CreditCardTwoToneIcon ;
      case 'realEstate':
        return HomeTwoToneIcon;
      case 'savingsInvestments':
        return ThumbUpAltTwoToneIcon;
      case 'vehicleInsurances':
        return DirectionsCarTwoToneIcon;
        case 'InsuranceData':
          return  AssignmentTurnedInTwoToneIcon;
      default:
        return null; 
    }
  };


  return (
    <Grid container spacing={gridSpacing}>
     <Grid item xs={12}>
  <Grid container spacing={gridSpacing}>
    {Object.entries(dashboardData?.leadsCount).map(([service, count]) => (
      <Grid item lg={3} sm={6} xs={12} key={service}>
        <ReportCard
          primary={String(count)}
          secondary={service}
          color={theme.palette.warning.main} 
          iconPrimary={getIcon(service)}
        />
      </Grid>
    ))}
  </Grid>
</Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                <Card style={{marginTop:"30px",marginLeft:"20px"}}>
  <CardHeader
    title={
      <Typography component="div" className="card-header">
        Leads Generation Over Time
      </Typography>
    }
  />
  <Divider />
  <CardContent>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SalesLineCard
          chartData={dashboardData && generateChartData(dashboardData?.data?.jobs)}
          title="Leads Generation Over Time"
          percentage={`${dashboardData && dashboardData?.leadsPercentage?.jobs}%`}
          icon={<TrendingDownIcon />}
          footerData={[
            {
              value: `${dashboardData && dashboardData?.leadsCount?.jobs}`, // Total number of leads generated
              label: 'Total Leads'
            },
            {
              value: `${dashboardData && calculateAverageLeadsPerDay(dashboardData)}`, // Average leads per day
              label: 'Avg. Leads/Day'
            }
          ]}
        />
      </Grid>
    </Grid>
  </CardContent>
</Card>


<Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
  <Card>
    <CardContent sx={{ p: '0 !important' }}>
      <Grid container alignItems="center" spacing={0}>
        {Object.entries(dashboardData.leadsCount).map(([service, count]) => (
          <FlatCardBlock key={service}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="subtitle4" align="left" sx={{fontSize:"11px"}}>
                  {service.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item sm zeroMinWidth>
                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                  {count}
                </Typography>
              </Grid>
            </Grid>
          </FlatCardBlock>
        ))}
      </Grid>
    </CardContent>
  </Card>
</Grid>

                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={dashboardData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
          <Card>
  <CardHeader
    title={
      <Typography component="div" className="card-header">
        Leads
      </Typography>
    }
  />
  <Divider />
  <CardContent>
    <Grid container spacing={gridSpacing}>
      {dashboardData && Object?.entries(dashboardData.leadsPercentage)?.map(([service, percentage]) => (
        <Grid item xs={12} key={service}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item sm zeroMinWidth>
              <Typography variant="body2">{service}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" align="right">
                {percentage}%
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" aria-label={service} value={parseFloat(percentage)} color="primary" />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>

          </Grid>
        </Grid>
      </Grid>

     <Grid item xs={12}>
      <Table/>
     </Grid>
    </Grid>
  );
};

export default Default;
