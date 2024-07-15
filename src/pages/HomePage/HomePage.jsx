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
    const newTodoItems = [dataCopy, ...todoItems];
    setTodosItems(newTodoItems);
    localStorage.setItem(StorageKey, JSON.stringify(newTodoItems));
  };

  useEffect(() => {
    const storedItems = localStorage.getItem(StorageKey);
    if (storedItems) {
      setTodosItems(JSON.parse(storedItems));
    }
  }, []);

  console.log('todoItems', todoItems);
  return (
    <BaseTemplate className={'home-page'}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          Welcome to the Home Page!
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={0}
          bgcolor={'grey'}
          py={'10px'}
          m={0}
        >
          <Grid item xs={6} bgcolor={'yellow'}>
            <CreateTodoForm handleSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={6} bgcolor={'pink'} p={0}>
            <Box display={'flex'} flexDirection={'column'} gap={3}>
              {todoItems.map(item => (
                <TodoListItem
                  title={item.title}
                  description={item.description}
                  key={item.id}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BaseTemplate>
  );
};

export default HomePage;
