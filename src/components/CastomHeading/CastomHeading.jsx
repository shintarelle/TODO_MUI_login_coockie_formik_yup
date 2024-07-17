import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function CastomHeading({ title }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      textAlign={'center'}
      sx={{ color: '#004d46' }}
    >
      {title}
    </Typography>
  );
}
CastomHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
export default CastomHeading;
