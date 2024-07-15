import routeNames from './routeNames';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const pagesRoutesConfig = [
  {
    path: routeNames.homePage,
    components: HomePage,
    id: 1,
  },
  {
    path: routeNames.loginPage,
    components: Login,
    id: 2,
  },
  {
    path: routeNames.notFound,
    components: NotFound,
    id: 3,
  },
];
export default pagesRoutesConfig;
