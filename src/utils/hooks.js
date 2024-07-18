import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

export const useSnackbar = ({
  anchorOrigin,
  open,
  autoHideDuration,
  onClose,
  severity,
  color,
  title,
}) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', backgroundColor: `${color}` }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
};
useSnackbar.propTypes = {
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string.isRequired,
    horizontal: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
