import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      {/* Kontainer utama diubah untuk layout sticky footer */}
      <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">

        <Navbar />

        {/* Konten utama dibuat fleksibel untuk mendorong footer ke bawah */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/prediksi" element={<FormPage />} />
            <Route path="/hasil" element={<ResultsPage />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;