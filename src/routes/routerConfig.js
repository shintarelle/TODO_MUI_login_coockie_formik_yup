import routeNames from './routeNames';
import HomePage from '../pages/HomePage';
import TodoListPage from '../pages/TodoListPage';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const pagesRoutesConfig = [
  {
    path: routeNames.home,
    components: HomePage,
    id: 1,
  },
  {
    path: routeNames.login,
    components: Login,
    id: 2,
  },
  {
    path: routeNames.todolist,
    components: TodoListPage,
    id: 3,
  },
  {
    path: routeNames.notFound,
    components: NotFound,
    id: 4,
  },
];
export default pagesRoutesConfig;
