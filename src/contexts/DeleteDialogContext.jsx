import React, { createContext, useContext, useState } from 'react';

const DeleteDialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [handleAgree, setHandleAgree] = useState(null);

  const handleClickOpen = onAgree => {
    setHandleAgree(() => onAgree);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHandleAgree(null);
  };

  const handleAgreeAction = () => {
    if (handleAgree) {
      handleAgree();
    }
    handleClose();
  };

  return (
    <DeleteDialogContext.Provider
      value={{ open, handleClickOpen, handleClose, handleAgreeAction }}
    >
      {children}
    </DeleteDialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DeleteDialogContext);
};
