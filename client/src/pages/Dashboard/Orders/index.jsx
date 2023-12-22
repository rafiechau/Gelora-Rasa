import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Fab } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectToken, selectUser } from '@containers/Client/selectors';
import AdminTable from '@components/AdminTable';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import classes from '../style.module.scss';
import { selectAllMyOrders } from './selectors';
import { actionDeleteOrderById, actionGetAllMyOrders } from './actions';

const OrdersPage = ({ user, allMyOrders, token }) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    dispatch(actionGetAllMyOrders());
  }, [dispatch]);

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCurrentOrderId(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = (orderId) => {
    setCurrentOrderId(orderId);
    handleOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(actionDeleteOrderById(currentOrderId, token));
    handleCloseConfirmDialog();
  };

  const orderColumns = [
    { id: 'eventName', label: 'Nama Event' },
    { id: 'totalTickets', label: 'Total Tickets' },
    { id: 'totalPay', label: 'Total Pay' },
    { id: 'ticketsTypes', label: 'Ticket Types' },
  ];

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
          <AdminTable
            columns={orderColumns}
            data={allMyOrders.map((order) => ({
              id: order.id,
              tanggalPembelian: order.tanggalPembelian,
              eventName: order.event.eventName,
              totalTickets: order.totalTickets,
              totalPay: order.totalPay,
              ticketsTypes: order.ticketsTypes,
            }))}
            onDelete={handleDelete}
            showEditButton={false}
          />
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="right">Nama Event</TableCell>
                  <TableCell align="right">Total Tickets</TableCell>
                  <TableCell align="right">Total Pay</TableCell>
                  <TableCell align="right">Ticket Types</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allMyOrders.map((order) => (
                  <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {order.tanggalPembelian}
                    </TableCell>
                    <TableCell align="right">{order.event.eventName}</TableCell>
                    <TableCell align="right">{order.totalTickets}</TableCell>
                    <TableCell align="right">{order.totalPay}</TableCell>
                    <TableCell align="right">{order.ticketsTypes}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" onClick={() => handleDelete(order.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <DeleteConfirmationDialog
            open={openConfirmDialog}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseConfirmDialog}
            dialogTitle={<FormattedMessage id="app_confirmation_delete_dialog" />}
            dialogContent={<FormattedMessage id="app_delete_dialog_header" />}
          />
        </div>
      </div>
    </div>
  );
};

OrdersPage.propTypes = {
  user: PropTypes.object,
  allMyOrders: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allMyOrders: selectAllMyOrders,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(OrdersPage));
