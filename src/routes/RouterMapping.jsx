import routerConfig from './routerConfig';
import { Routes, Route } from 'react-router-dom';

const RouterMapping = () => {
  console.log(routerConfig);
  return (
    <Routes>
      {routerConfig.map(({ path, component: PageComponent, id }) => {
        return <Route path={path} element={<PageComponent />} key={id} />;
      })}
    </Routes>
  );
};
export default RouterMapping;
