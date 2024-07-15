import routeNames from './routeNames';
import HomePage from '../pages/HomePage';
import TodoListPage from '../pages/TodoListPage';
import TodoItemPage from '../pages/TodoItemPage';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const pagesRoutesConfig = [
  {
    path: routeNames.home,
    component: HomePage,
    id: 1,
  },
  {
    path: routeNames.login,
    component: Login,
    id: 2,
  },
  {
    path: routeNames.todolist,
    component: TodoListPage,
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
