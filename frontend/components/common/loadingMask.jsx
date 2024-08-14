import {Backdrop, CircularProgress} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingMask({open}) {
  return (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

LoadingMask.propTypes = {
  open: PropTypes.bool,
};
