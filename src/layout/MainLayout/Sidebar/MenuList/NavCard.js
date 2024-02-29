// material-ui
import {  Card, CardMedia, CardContent, Stack, Typography } from '@mui/material';

// assets

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => {
  return (
    <Card sx={{ bgcolor: 'rgb(250, 250, 250)', border: '1px solid rgb(230, 235, 241)', m: 2 }}>
      <CardContent>
        <Stack alignItems="center" spacing={2.5}>
          <CardMedia component="img"  sx={{ width: 112 }} />
          <Stack alignItems="center">
            <Typography variant="h5">Materially Pro</Typography>
            <Typography variant="h6" color="secondary" textAlign="center">
            </Typography>
          </Stack>
          
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NavCard;
