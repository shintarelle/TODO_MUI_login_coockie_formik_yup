import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageKey } from '../utils/const';
import BaseTemplate from '../templates/BaseTemplate';
import CastomHeading from '../components/CastomHeading';
import TodoItem from '../components/TodoItem/TodoItem';
import { Container, Typography, Box } from '@mui/material';
import routeNames from '../routes/routeNames';

function TodoItemPage() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoStatus, setTodoStatus] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  let { id } = useParams();
  const itemId = id.slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(StorageKey)) || [];
    const foundItem = storedItems.find(item => item.id === itemId);
    if (foundItem) {
      setTodoTitle(foundItem.title);
      setTodoDescription(foundItem.description);
      setTodoStatus(foundItem.status);
    }
  }, [itemId]);

  const handleDelete = () => {
    const storedItems = JSON.parse(localStorage.getItem(StorageKey)) || [];
    const filterItems = storedItems.filter(item => item.id !== itemId);
    localStorage.setItem(StorageKey, JSON.stringify(filterItems));
    navigate(routeNames.home);
  };

  const handleStatusChange = (id, newStatus) => {
    const storedItems = JSON.parse(localStorage.getItem(StorageKey)) || [];
    const updatedTodoItems = storedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    localStorage.setItem(StorageKey, JSON.stringify(updatedTodoItems));
  };

  const handleSubmit = data => {
    setTodoTitle(data.title);
    setTodoDescription(data.description);
    console.log(data);
    const storedItems = JSON.parse(localStorage.getItem(StorageKey)) || [];
    const updatedTodoItems = storedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, title: data.title, description: data.description };
      }
      return item;
    });
    localStorage.setItem(StorageKey, JSON.stringify(updatedTodoItems));
    setIsEdit(false);
  };

  // if (!todoItem) {
  //   return <div>Loading...</div>; // Можно добавить лоадер или другой UI для ожидания
  // }
  return (
    <BaseTemplate className={'todo-item-page'}>
      <Box
        maxWidth="lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CastomHeading title={'Todo Item Page'} />
        <TodoItem
          id={itemId}
          title={todoTitle}
          description={todoDescription}
          status={todoStatus}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </Box>
    </BaseTemplate>
  );
}

export default TodoItemPage;
