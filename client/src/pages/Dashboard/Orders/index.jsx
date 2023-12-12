import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { SideBar } from '@components/sidebar';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BottomBar } from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectUser } from '@containers/Client/selectors';
import classes from '../style.module.scss';

const DummyOrders = [
  {
    id: '1',
    date: '2023-06-20',
    userId: 'user123',
    eventId: 'event456',
    totalTickets: 2,
    totalPay: '150,000 IDR',
    status: 'Completed',
    ticketTypes: 'VIP',
  },
  {
    id: '2',
    date: '2023-06-22',
    userId: 'user124',
    eventId: 'event457',
    totalTickets: 1,
    totalPay: '75,000 IDR',
    status: 'Pending',
    ticketTypes: 'General',
  },
  {
    id: '3',
    date: '2023-06-25',
    userId: 'user125',
    eventId: 'event458',
    totalTickets: 3,
    totalPay: '225,000 IDR',
    status: 'Cancelled',
    ticketTypes: 'General',
  },
  // ... tambahkan lebih banyak order sesuai kebutuhan
];
const OrdersPage = ({ user }) => {
  const dispatch = useDispatch();

  const handleDeleteOrder = (orderId) => {
    // Logic untuk menghapus order
  };

  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <BottomBar />
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          // onClick={handleOpenCreatePostDialog}
          sx={{ position: 'fixed', bottom: 60, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={classes.containerProfilePage}>
          <div>My Orders</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Event ID</TableCell>
                  <TableCell align="right">Total Tickets</TableCell>
                  <TableCell align="right">Total Pay</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Ticket Types</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DummyOrders.map((order) => (
                  <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {order.date}
                    </TableCell>
                    <TableCell align="right">{order.eventId}</TableCell>
                    <TableCell align="right">{order.totalTickets}</TableCell>
                    <TableCell align="right">{order.totalPay}</TableCell>
                    <TableCell align="right">{order.status}</TableCell>
                    <TableCell align="right">{order.ticketTypes}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" onClick={() => handleDeleteOrder(order.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

OrdersPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(OrdersPage));
