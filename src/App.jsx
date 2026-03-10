import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ComicReader from './pages/ComicReader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic/:id" element={<ComicReader />} />
      </Routes>
    </Router>
  );
}

export default App;

