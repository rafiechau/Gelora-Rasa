import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import toast from 'react-hot-toast';
import { selectUser } from '@containers/Client/selectors';
import AdminTable from '@components/AdminTable';
import OrderDetailsDialog from '@components/OrderDetailsDialog';
import { useNavigate } from 'react-router-dom';
import classes from '../style.module.scss';
import { selectAllMyOrders } from './selectors';
import { actionGetAllMyOrders } from './actions';

const OrdersPage = ({ user, allMyOrders, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user?.role !== 1) {
      toast.error(formatMessage({ id: 'app_forbidden' }));
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, user, navigate]);

  useEffect(() => {
    dispatch(actionGetAllMyOrders());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenOrderDetailsDialog(true);
  };

  const handleCloseOrderDetailsDialog = () => {
    setOpenOrderDetailsDialog(false);
    setSelectedOrder(null);
  };

  const orderColumns = [
    { id: 'uniqueCode', messageId: 'app_column_event_unique_code', label: 'Kode Unik' },
    { id: 'eventName', messageId: 'app_column_event_name', label: 'Nama Event' },
    { id: 'totalTickets', messageId: 'app_column_total_tickets', label: 'Total Tickets' },
    { id: 'totalPay', messageId: 'app_column_total_pay', label: 'Total Pay' },
    { id: 'ticketsTypes', messageId: 'app_column_ticket_types', label: 'Ticket Types' },
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
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={classes.containerProfilePage}>
          <div className={classes.title}>
            <FormattedMessage id="app_header_my_orders" />
          </div>
          <AdminTable
            columns={orderColumns}
            data={allMyOrders.map((order) => ({
              id: order.id,
              uniqueCode: order.uniqueCode,
              tanggalPembelian: order.tanggalPembelian,
              eventName: order.event.eventName,
              totalTickets: order.totalTickets,
              totalPay: order.totalPay,
              ticketsTypes: order.ticketsTypes,
              status: order?.status,
            }))}
            onEdit={handleViewDetails}
            showEditButton
            showDeleteButton={false}
          />
        </div>
      </div>
      <OrderDetailsDialog open={openOrderDetailsDialog} onClose={handleCloseOrderDetailsDialog} order={selectedOrder} />
    </div>
  );
};

OrdersPage.propTypes = {
  user: PropTypes.object,
  allMyOrders: PropTypes.array,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allMyOrders: selectAllMyOrders,
});

export default injectIntl(connect(mapStateToProps)(OrdersPage));
