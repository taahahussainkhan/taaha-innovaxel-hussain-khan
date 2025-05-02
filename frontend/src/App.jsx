import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UrlForm from "./components/UrlForm";
import RetrieveForm from "./components/RetrieveForm";
import DeleteForm from "./components/DeleteUrl";
import StatsForm from "./components/StatsForm";
import UpdateUrl from "./components/UpdateShortUrl";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="pt-20 px-4">
          <Routes>
            <Route path="/" element={<UrlForm />} />
            <Route path="/retrieve" element={<RetrieveForm />} />
            <Route path="/update" element={<UpdateUrl />} />
            <Route path="/delete" element={<DeleteForm />} />
            <Route path="/stats" element={<StatsForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
