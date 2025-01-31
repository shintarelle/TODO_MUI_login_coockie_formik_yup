import routeNames from './routeNames';
import HomePage from '../pages/HomePage';
import CreateTodoItem from '../pages/CreateTodoItem';
import TodoItemPage from '../pages/TodoItemPage';
import Login from '../pages/LoginPage';
import NotFound from '../pages/NotFound';

const pagesRoutesConfig = [
  {
    path: routeNames.login,
    component: Login,
    id: 1,
  },
  {
    path: routeNames.home,
    component: HomePage,
    id: 2,
  },
  {
    path: routeNames.create,
    component: CreateTodoItem,
    id: 3,
  },
  {
    path: routeNames.todoitem,
    component: TodoItemPage,
    id: 4,
  },
  {
    path: routeNames.notFound,
    component: NotFound,
    id: 5,
  },
];
export default pagesRoutesConfig;
