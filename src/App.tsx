import { Routes, Route } from 'react-router-dom';
import { routeComponents, getPath } from '@/router/routes';
import { getTypedEntries } from '@/utils/typedEntries';
import PageLayout from '@/layouts/PageLayout';
import MovieDetails from '@/pages/MovieDetails';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<PageLayout />}>
          {getTypedEntries(routeComponents).map(([key, Component]) => {
            const path = getPath(key);

            return <Route key={key} path={path} element={<Component />} />;
          })}

          <Route path="/catalog/movies/:slug" element={<MovieDetails />} />

          {/* <Route path="/catalog/shows/:slug" element={<ShowDetails />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
