import React, { useEffect, useState } from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import { Container, Grid, Typography, Box } from '@mui/material';
import CreateTodoForm from '../../components/CreateTodoForm/CreateTodoForm';
import { StorageKey } from '../../utils/const';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const [todoItems, setTodosItems] = useState([]);

  const handleSubmit = data => {
    let dataCopy = cloneDeep(data);
    dataCopy.id = uuidv4();
    dataCopy.status = 'pending';
    const newTodoItems = [dataCopy, ...todoItems];
    setTodosItems(newTodoItems);
    localStorage.setItem(StorageKey, JSON.stringify(newTodoItems));
  };

  const handleDelete = id => {
    const updatedTodoItems = todoItems.filter(item => item.id !== id);
    setTodosItems(updatedTodoItems);
    localStorage.setItem(StorageKey, JSON.stringify(updatedTodoItems));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodoItems = todoItems.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setTodosItems(updatedTodoItems);
    localStorage.setItem(StorageKey, JSON.stringify(updatedTodoItems));
  };

  useEffect(() => {
    const storedItems = localStorage.getItem(StorageKey);
    if (storedItems) {
      setTodosItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <BaseTemplate className={'home-page'}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          Welcome to the Home Page!
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={0} py={'10px'} mb={3}>
          <Grid item xs={6}>
            <CreateTodoForm handleSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={6} p={0} mb={3}>
            <Container>
              <Typography variant="h4" gutterBottom>
                Todo List
              </Typography>
              <Box display={'flex'} flexDirection={'column'} gap={3}>
                {todoItems.map(item => (
                  <TodoListItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    key={item.id}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </BaseTemplate>
  );
};

export default HomePage;
