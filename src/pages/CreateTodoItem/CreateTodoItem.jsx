import { useEffect, useState, useRef } from 'react';
import localStorageService from '../../utils/functions';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';
import BaseTemplate from '../../templates/BaseTemplate';
import CastomHeading from '../../components/CastomHeading';
import CreateTodoForm from '../../components/CreateTodoForm';
import { Container, Typography, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

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
  };

  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorageService.getData();
    if (storedItems) {
      setTodoItems(JSON.parse(storedItems));
    }
  }, []);

  const handleSubmit = data => {
    setIsLoading(true);
    //components added in reverse order
    let dataCopy = cloneDeep(data);
    dataCopy.id = uuidv4();
    dataCopy.status = 'pending';

    setState({ vertical: 'bottom', horizontal: 'center', open: true });

    timerId.current = setTimeout(() => {
      try {
        const newTodoItems = [dataCopy, ...todoItems];
        setTodoItems(newTodoItems);
        localStorageService.saveItem(dataCopy);
        setIsLoading(false);
        navigate(routeNames.home);
      } catch (error) {
        setIsError(error.message || 'An error occurred');
        setIsLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    if (open) {
      console.log('Snackbar should be open now');
    }
  }, [open]);
  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%', backgroundColor: '#007974' }}
          >
            Todo was successfully created
          </Alert>
        </Snackbar>
      </Container>
    </BaseTemplate>
  );
};

export default CreateTodoItem;
