import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UrlForm from './components/UrlForm';
import RetrieveForm from './components/RetrieveForm';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="px-4 flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
            <Routes>
              <Route path="/" element={<UrlForm />} />
              <Route path="/retrieve" element={<RetrieveForm />} />
              <Route path="/update" element={<div>Update Page</div>} />
              <Route path="/delete" element={<div>Delete Page</div>} />
              <Route path="/stats" element={<div>Stats Page</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
