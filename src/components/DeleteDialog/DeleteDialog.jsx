import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialog } from '../../contexts/DeleteDialogContext';

export default function DeleteDialog() {
  const { open, handleClose, handleAgreeAction } = useDialog();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to delete?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation is irreversible. When deleted, the data will be lost
          forever
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAgreeAction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
