import React from 'react'

const Percenatge = () => {
  return (
    <div>
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
    </div>
  )
}

export default Percenatge