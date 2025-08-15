import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      {/* Latar belakang utama aplikasi */}
      <div className="bg-slate-900 text-white min-h-screen font-sans">
        <main>
          {/* Mendefinisikan semua halaman/rute aplikasi */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/prediksi" element={<FormPage />} />
            <Route path="/hasil" element={<ResultsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;