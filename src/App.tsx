import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import PageLayout from '@/layouts/PageLayout';
import About from '@/pages/About';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
