const routeNames = {
  login: '/',
  home: '/home',
  create: '/create',
  todolist: '/todolist',
  todoitem: '/todolist/:id',
  notFound: '*',
};

Object.freeze(routeNames);

export default routeNames;
