import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Box,
  FormControl,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DrawIcon from '@mui/icons-material/Draw';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';

function TodoListItem({
  id,
  title,
  description,
  status,
  onDelete,
  setTodoStatus,
  onStatusChange,
  isEditMode,
  changeStatusEdit,
}) {
  const [itemStatus, setItemStatus] = React.useState(status);
  const navigate = useNavigate();

  const handleViewTodo = id => {
    navigate(routeNames.todoitem.replace('id', `${id}`));
  };

  const handleChange = event => {
    setItemStatus(event.target.value);
    if (setTodoStatus) {
      setTodoStatus(event.target.value);
    }
    if (onStatusChange) {
      onStatusChange(id, event.target.value);
    }
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
        sx={{ backgroundColor: '#dff2f3', color: '#000' }}
      >
        <Typography variant={'h6'} textAlign={'left'}>
          {title}
        </Typography>
        <Typography variant={'subtitle1'}>{description}</Typography>
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
              value={itemStatus}
              onChange={handleChange}
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
            {isEditMode ? (
              <IconButton
                aria-label="edit"
                onClick={changeStatusEdit}
                sx={{ backgroundColor: '#39b6b6', color: '#fff' }}
              >
                <DrawIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="view"
                onClick={e => {
                  handleViewTodo(id);
                }}
                sx={{ backgroundColor: '#87009d', color: '#fff' }}
              >
                <VisibilityIcon />
              </IconButton>
            )}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  setTodoStatus: PropTypes.func,
  isEditMode: PropTypes.bool,
  changeStatusEdit: PropTypes.func,
};
export default TodoListItem;
