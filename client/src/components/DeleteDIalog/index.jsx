// import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

// const DeleteDialog = ({ handleDialog, handleDelete, open }) => (
//   <Dialog
//     open={open}
//     onClose={handleDialog}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//   >
//     <DialogTitle id="alert-dialog-title" fontSize="medium">
//       <FormattedMessage id="app_delete_dialog_header" />
//     </DialogTitle>
//     <DialogActions>
//       <Button onClick={handleDialog} size="small" sx={{ textTransform: 'capitalize' }}>
//         <FormattedMessage id="app_back" />
//       </Button>
//       <Button
//         onClick={() => {
//           handleDialog();
//           handleDelete();
//         }}
//         autoFocus
//         size="small"
//         sx={{ textTransform: 'capitalize' }}
//       >
//         <FormattedMessage id="app_delete_dialog_delete" />
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// DeleteDialog.propTypes = {
//   handleDialog: PropTypes.func,
//   handleDelete: PropTypes.func,
//   open: PropTypes.bool,
// };

// export default DeleteDialog;
