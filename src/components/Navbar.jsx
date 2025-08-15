import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo atau Judul Aplikasi */}
        <Link to="/" className="text-xl font-bold tracking-wider">
          Sleep<span className="text-cyan-400">Quality</span>AI
        </Link>

        {/* Link Navigasi (jika dibutuhkan di masa depan) */}
        {/* <div className="space-x-4">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/prediksi" className="hover:text-cyan-400">Prediksi</Link>
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;