import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  NativeSelect,
} from '@mui/material';

function TodoListItem({ title, description }) {
  const [status, setStatus] = React.useState('pending');

  const handleChange = event => {
    setStatus(event.target.value);
  };
  return (
    <Container>
      <Paper elevation={6}>
        <Box display="flex" justifyContent={'space-between'} gap={1} p={2}>
          <Box display="flex" flexDirection={'column'} gap={1}>
            <Typography variant={'h6'}>{title}</Typography>
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
                value={status}
                onChange={handleChange}
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
            <Button variant={'contained'} size="small">
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
TodoListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};
export default TodoListItem;
