import { useEffect, useState, useRef } from 'react';
import localStorageService from '../../utils/functions';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';
import BaseTemplate from '../../templates/BaseTemplate';
import CastomHeading from '../../components/CastomHeading';
import CreateTodoForm from '../../components/CreateTodoForm';
import { Container, Typography } from '@mui/material';
import { useSnackbar } from '../../utils/hooks';

const formInitialValues = {
  title: '',
  description: '',
};

const CreateTodoItem = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const timerId = useRef();
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    if (!isError) {
      navigate(routeNames.home);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorageService.getData();
    if (storedItems) {
      setTodoItems(storedItems);
    }
  }, []);

  const handleSubmit = data => {
    setIsLoading(true);
    //components added in reverse order
    let dataCopy = cloneDeep(data);
    dataCopy.id = uuidv4();
    dataCopy.status = 'pending';

    timerId.current = setTimeout(() => {
      try {
        const newTodoItems = [dataCopy, ...todoItems];
        setTodoItems(newTodoItems);
        localStorageService.saveItem(dataCopy);
        setState({ vertical: 'bottom', horizontal: 'center', open: true });
        setIsLoading(false);
      } catch (error) {
        setIsError(error.message || 'An error occurred');
        setIsLoading(false);
        setState({ vertical: 'bottom', horizontal: 'center', open: true });
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  const snackbarElement = useSnackbar({
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    open: open,
    autoHideDuration: 1000,
    onClose: handleClose,
    severity: isError ? 'error' : 'success',
    color: isError ? '#b639b6' : '#007974',
    title: isError ? 'Error...' : 'Todo was successfully created',
  });

  return (
    <BaseTemplate className={'create-item-page'}>
      <Container maxWidth="xs">
        <CastomHeading title={'Create New Todo'} />
        <CreateTodoForm
          handleSubmit={handleSubmit}
          formInitialValues={formInitialValues}
          isLoading={isLoading}
        />

        {isError && <Typography>Oooops, something went wrong</Typography>}

        {snackbarElement}
      </Container>
    </BaseTemplate>
  );
};

export default CreateTodoItem;
