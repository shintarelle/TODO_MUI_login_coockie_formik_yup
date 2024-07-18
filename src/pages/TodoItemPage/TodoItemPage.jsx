import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageKey } from '../../utils/const';
import BaseTemplate from '../../templates/BaseTemplate';
import CastomHeading from '../../components/CastomHeading/CastomHeading';
import TodoListItem from '../../components/TodoListItem';
import EditTodoListItem from '../../components/EditTodoListItem';
import { Box } from '@mui/material';
import routeNames from '../../router/routeNames';
import localStorageService from '../../utils/functions';

function TodoItemPage() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoStatus, setTodoStatus] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  let { id } = useParams();
  const itemId = id.slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorageService.getData();
    const foundItem = storedItems.find(item => item.id === itemId);
    if (foundItem) {
      setTodoTitle(foundItem.title);
      setTodoDescription(foundItem.description);
      setTodoStatus(foundItem.status);
    }
  }, [itemId]);

  const changeStatusEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    // const storedItems = JSON.parse(localStorage.getItem(StorageKey)) || [];
    // const filterItems = storedItems.filter(item => item.id !== itemId);
    // localStorage.setItem(StorageKey, JSON.stringify(filterItems));
    localStorageService.deleteItem(itemId);
    navigate(routeNames.home);
  };

  const handleStatusChange = (id, newStatus) => {
    // const storedItems = localStorageService.getData();
    // const updatedTodoItems = storedItems.map(item => {
    //   if (item.id === itemId) {
    //     return { ...item, status: newStatus };
    //   }
    //   return item;
    // });
    // localStorage.setItem(StorageKey, JSON.stringify(updatedTodoItems));
    localStorageService.updateItem(id, newStatus);
  };

  const handleSubmit = data => {
    setTodoTitle(data.title);
    setTodoDescription(data.description);
    setTodoStatus(data.status);
    console.log(data);
    const storedItems = localStorageService.getData();
    const updatedTodoItems = storedItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          title: data.title,
          description: data.description,
          status: data.status,
        };
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
        {isEdit ? (
          <EditTodoListItem
            id={itemId}
            todoTitle={todoTitle}
            setTodoTitle={setTodoTitle}
            todoDescription={todoDescription}
            setTodoDescription={setTodoDescription}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
            onDelete={handleDelete}
            handleSubmit={handleSubmit}
            setIsEdit={setIsEdit}
          />
        ) : (
          <TodoListItem
            id={itemId}
            title={todoTitle}
            description={todoDescription}
            status={todoStatus}
            onDelete={handleDelete}
            setTodoStatus={setTodoStatus}
            onStatusChange={handleStatusChange}
            changeStatusEdit={changeStatusEdit}
            isEditMode={true}
          />
        )}
      </Box>
    </BaseTemplate>
  );
}

export default TodoItemPage;
