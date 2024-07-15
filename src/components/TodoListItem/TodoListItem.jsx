import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  NativeSelect,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../routes/routeNames';

function TodoListItem({ id, title, description, status }) {
  const [itemStatus, setItemStatus] = React.useState(status);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(routeNames.todoitem.replace(':id', id));
  };

  const handleChange = event => {
    setItemStatus(event.target.value);
  };
  const handleSelectClick = event => {
    event.stopPropagation();
  };
  return (
    <Box
      onMouseDown={e => e.stopPropagation()}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <Paper elevation={6} style={{ borderRadius: '10px' }}>
        <Box display="flex" justifyContent={'space-between'} gap={1} p={2}>
          <Box display="flex" flexDirection={'column'} gap={1}>
            <Typography variant={'h6'} textAlign={'left'}>
              {title}
            </Typography>
            <Typography variant={'subtitle1'}>{description}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={'column'}
            gap={1}
            maxWidth={'120px'}
          >
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
                // обработка клика по кнопке
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
TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
export default TodoListItem;
