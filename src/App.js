// import RouterMapping from './routes/RouterMapping';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      {/* <header>
        <a href="/">Login </a>
        <a href="/home">Home</a>
        <a href="/home">Logout</a>
      </header> */}
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/home'} element={<HomePage />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
