import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  NativeSelect,
} from '@mui/material';
import CreateTodoForm from '../CreateTodoForm/CreateTodoForm';

function TodoItem({
  id,
  title,
  description,
  status,
  onDelete,
  onStatusChange,
  handleSubmit,
  isEdit,
  setIsEdit,
}) {
  const [itemStatus, setItemStatus] = useState(status);

  const formInitialValues = {
    title,
    description,
  };

  const handleChange = event => {
    const newStatus = event.target.value;
    setItemStatus(newStatus);
    onStatusChange(id, newStatus);
  };

  const handleSelectClick = event => {
    event.stopPropagation();
  };
  return (
    <Box width={'800px'}>
      <Paper elevation={6} style={{ borderRadius: '10px' }}>
        <Box display="flex" justifyContent={'space-between'} gap={1} p={3}>
          {isEdit ? (
            <CreateTodoForm
              handleSubmit={handleSubmit}
              formInitialValues={formInitialValues}
            />
          ) : (
            <Box display="flex" flexDirection={'column'} gap={1}>
              <Typography variant={'h6'} textAlign={'left'}>
                {title}
              </Typography>
              <Typography variant={'subtitle1'}>{description}</Typography>
            </Box>
          )}
          <Box display="flex" flexDirection={'column'} gap={1} width={'200px'}>
            {isEdit ? (
              <>
                <FormControl fullWidth>
                  <NativeSelect
                    value={itemStatus}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    inputProps={{
                      name: 'status',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={'pending'}>Pending</option>
                    <option value={'completed'}>Completed</option>
                    <option value={'not-completed'}>Not-Completed</option>
                  </NativeSelect>
                </FormControl>
                <Button
                  variant={'contained'}
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant={'contained'}
                size="small"
                onClick={e => {
                  e.stopPropagation();
                  setIsEdit(true);
                }}
              >
                Edit
              </Button>
            )}
            <Button
              variant={'contained'}
              size="small"
              onClick={e => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};
export default TodoItem;
