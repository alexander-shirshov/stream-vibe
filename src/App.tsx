import { Routes, Route } from 'react-router-dom';
import { routeComponents, getPath } from '@/router/routes';
import { getTypedEntries } from '@/utils/typedEntries';
import PageLayout from '@/layouts/PageLayout';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        {getTypedEntries(routeComponents).map(([key, Component]) => {
          const path = getPath(key);
          return <Route key={key} path={path} element={<Component />} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
