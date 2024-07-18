import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageKey } from '../../utils/const';
import BaseTemplate from '../../templates/BaseTemplate';
import CastomHeading from '../../components/CastomHeading/CastomHeading';
import TodoListItem from '../../components/TodoListItem';
import EditTodoListItem from '../../components/EditTodoListItem';
import { Box, CircularProgress } from '@mui/material';
import routeNames from '../../router/routeNames';
import localStorageService from '../../utils/functions';
import { useSnackbar } from '../../utils/hooks';

function TodoItemPage() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoStatus, setTodoStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let { id } = useParams();
  const itemId = id.slice(1);
  const navigate = useNavigate();

  const changeStatusEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    localStorageService.deleteItem(itemId);
    navigate(routeNames.home);
  };

  const handleStatusChange = (id, newStatus) => {
    localStorageService.updateItemStatus(id, newStatus);
  };

  const handleSubmit = data => {
    try {
      if (data === undefined) {
        throw new Error('Delete failed');
      }
      setTodoTitle(data.title);
      setTodoDescription(data.description);
      setTodoStatus(data.status);
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
      setState({ vertical: 'bottom', horizontal: 'center', open: true });
    } catch (error) {
      setIsError(error.message || 'An error occurred');
      setState({ vertical: 'bottom', horizontal: 'center', open: true });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const storedItems = localStorageService.getData();
    const foundItem = storedItems.find(item => item.id === itemId);
    if (foundItem) {
      setTodoTitle(foundItem.title);
      setTodoDescription(foundItem.description);
      setTodoStatus(foundItem.status);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [itemId]);

  const snackbarElement = useSnackbar({
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    open: open,
    autoHideDuration: 2000,
    onClose: handleClose,
    severity: isError ? 'error' : 'success',
    color: isError ? '#b639b6' : '#007974',
    title: isError ? `Error... ${isError}` : 'Todo was successfully edited',
  });

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
        {isLoading ? (
          <Box
            height={'200px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <CircularProgress />
          </Box>
        ) : isEdit ? (
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
      {snackbarElement}
    </BaseTemplate>
  );
}

export default TodoItemPage;
