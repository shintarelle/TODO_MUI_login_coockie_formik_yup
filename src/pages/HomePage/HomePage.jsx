import React, { useEffect, useState } from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import localStorageService from '../../utils/functions';
import CastomHeading from '../../components/CastomHeading/CastomHeading';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';
import { useDialog } from '../../contexts/DeleteDialogContext';

const HomePage = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleClickOpen } = useDialog();

  const handleDelete = id => {
    const updatedTodoItems = todoItems.filter(item => item.id !== id);
    setTodoItems(updatedTodoItems);
    localStorageService.setData(updatedTodoItems);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodoItems = todoItems.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setTodoItems(updatedTodoItems);
    localStorageService.setData(updatedTodoItems);
  };

  const openDeleteDialog = id => {
    handleClickOpen(() => handleDelete(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const storedItems = localStorageService.getData();
    if (storedItems) {
      setTodoItems(storedItems);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <BaseTemplate className={'home-page'}>
      <CastomHeading title={'Todo List'} />
      <Grid container rowSpacing={2} columnSpacing={0} py={'10px'} mb={3}>
        <Grid item xs={12} p={0} mb={3}>
          <Container>
            <Box mb={3}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#87009d',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#007974',
                  },
                  '&:focus': {
                    backgroundColor: '#007974',
                  },
                }}
                onClick={() => navigate(routeNames.create)}
              >
                Add Todo
              </Button>
            </Box>
            {isLoading ? (
              <Box
                height={'200px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box display={'flex'} flexDirection={'column'} gap={3}>
                <Grid container spacing={3}>
                  {todoItems.length ? (
                    todoItems.map(item => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <TodoListItem
                          id={item.id}
                          title={item.title}
                          description={item.description}
                          status={item.status}
                          onDelete={openDeleteDialog}
                          onStatusChange={handleStatusChange}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="subtitle.1" gutterBottom>
                      no items
                    </Typography>
                  )}
                </Grid>
              </Box>
            )}
          </Container>
        </Grid>
      </Grid>
    </BaseTemplate>
  );
};

export default HomePage;
