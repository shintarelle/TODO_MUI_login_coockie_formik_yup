import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Box,
  FormControl,
  IconButton,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Done from '@mui/icons-material/Done';
import Clear from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';

function TodoListItem({
  id,
  todoTitle,
  todoDescription,
  todoStatus,
  onDelete,
  setIsEdit,
  handleSubmit,
}) {
  const [title, setTitle] = useState(todoTitle);
  const [description, setDescription] = useState(todoDescription);
  const [status, setStatus] = useState(todoStatus);
  const navigate = useNavigate();

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleChangeStatus = event => {
    setStatus(event.target.value);
  };

  const submitData = () => {
    const data = {
      id,
      title,
      description,
      status,
    };
    handleSubmit(data);
  };

  return (
    <Paper
      elevation={6}
      style={{
        borderRadius: '10px',
        width: '100%',
      }}
    >
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent={'space-between'}
        gap={4}
        p={2}
        sx={{ backgroundColor: '#fff4e0', color: '#000' }}
      >
        <TextField
          required
          id="filled-required"
          variant="outlined"
          value={title}
          onChange={handleChangeTitle}
        />
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={description}
          onChange={handleChangeDescription}
        />
        <Box
          sx={{ width: '100%' }}
          display="flex"
          flexDirection={'column'}
          justifyContent={'space-between'}
          gap={2}
        >
          <FormControl>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              onChange={handleChangeStatus}
              size="small"
              sx={{ width: 150 }}
            >
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
              <MenuItem value={'not-completed'}>Not-Completed</MenuItem>
            </Select>
          </FormControl>
          <Box
            display="flex"
            gap={1}
            width={'100%'}
            justifyContent={'flex-end'}
            py={'20px'}
          >
            <IconButton
              aria-label="cancel"
              onClick={e => {
                setIsEdit(false);
              }}
              sx={{ backgroundColor: '#39b6b6', color: '#fff' }}
            >
              <Clear />
            </IconButton>

            <IconButton
              aria-label="done"
              onClick={() => {
                submitData();
              }}
              sx={{ backgroundColor: '#87009d', color: '#fff' }}
            >
              <Done />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={e => {
                onDelete(id);
              }}
              sx={{ backgroundColor: '#d40015', color: '#fff' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  todoDescription: PropTypes.string.isRequired,
  todoStatus: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func,
  handleSubmit: PropTypes.func,
};
export default TodoListItem;
