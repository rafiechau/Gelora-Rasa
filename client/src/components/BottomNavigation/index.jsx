import AssistWalkerTwoToneIcon from '@mui/icons-material/AssistWalkerTwoTone';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const BottomBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePayment = () => {
    dispatch(
      paymentRequest(() => {
        dispatch(updateRole());
      })
    );
  };

  const getActiveTab = (path) => {
    switch (path) {
      case '/':
        return 0;
      case '/message':
        return 1;
      case '/payments':
        return 2;
      case '/myPost':
        return 3;
      default:
        return 0;
    }
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/message');
        break;
      case 2:
        handlePayment();
        break;
      case 3:
        navigate('/myPost');
        break;
    }
  };

  const activeTab = getActiveTab(location.pathname);
  return (
    <BottomNavigation showLabels value={activeTab} onChange={handleChange}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Message" icon={<MessageIcon />} />
      <BottomNavigationAction label="Payments" icon={<PaymentIcon />} />
      <BottomNavigationAction label="My Posts" icon={<AssistWalkerTwoToneIcon />} />
    </BottomNavigation>
  );
};
