// import RouterMapping from './routes/RouterMapping';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoListPage from './pages/TodoListPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/home'} element={<HomePage />} />
        <Route path={'/todolist'} element={<TodoListPage />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
