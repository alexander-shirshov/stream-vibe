import { Routes, Route } from 'react-router-dom';
import { linkItems } from '@/constants/linkItems';
import { getTypedEntries } from '@/utils/typedEntries';
import PageLayout from '@/layouts/PageLayout';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        {getTypedEntries(linkItems).map(([label, item]) => {
          const Component = item.component;
          return <Route key={label} path={item.path} element={<Component />} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
