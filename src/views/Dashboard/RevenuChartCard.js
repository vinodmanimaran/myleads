import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

const RevenuChartCard = ({ chartData }) => {
  const theme = useTheme();
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    if (chartData && chartData.leadsPercentage) {
      const seriesData = Object.values(chartData.leadsPercentage);
      const labels = Object.keys(chartData.leadsPercentage);

      // Define fixed colors for each service
      const serviceColors = {
        jobs: '#FF5733',
        loans: '#33FFC6',
        creditCards: '#3399FF',
        realEstate: '#FF33F9',
        savingsInvestments: '#F9FF33',
        otherInsurances: '#33FFAA',
        vehicleInsurances: '#338AFF',
      };

      const newBarChartData = {
        series: [{ data: seriesData }],
        options: {
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: labels,
          },
          colors: labels.map(service => serviceColors[service]),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      };
      setBarChartData(newBarChartData);
    }
  }, [chartData]);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  if (!chartData || !chartData.leadsPercentage || Object.keys(chartData.leadsPercentage)?.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1">No data available for the chart.</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!barChartData) {
    return null; // Don't render anything if chart data is not ready
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography component="div" className="card-header">
            Leads Over the Services
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          <Grid item xs={12} sm={7} md={12}>
            <Chart series={barChartData.series} options={barChartData.options} height={350} width={400} />
          </Grid>
          {/* <Grid item sx={{ display: { md: 'block', sm: 'none' } }}>
            <Divider />
          </Grid> */}
          {/* <Grid
            item
            container
            direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
            justifyContent="space-around"
            alignItems="center"
            xs={12}
            sm={5}
            md={12}
          >
            {Object.keys(chartData.leadsPercentage).map((service, index) => (
              <Grid item key={index} sx={{ margin: '10px' }}>
                <Grid container direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ margin: '10px' }}>
                    {service}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ margin: '10px' }}>
                    {chartData.leadsPercentage[service]}%
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

// RevenuChartCard.propTypes = {
//   chartData: PropTypes.shape({
//     leadsPercentage: PropTypes.objectOf(PropTypes.string),
//   }),
// };

export default RevenuChartCard;
