import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    // Kontainer utama untuk memposisikan konten di tengah layar
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      
      {/* Judul Utama */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-cyan-400 animate-fade-in-down">
        Cek Kesehatan Tidur Anda!
      </h1>
      
      {/* Deskripsi Singkat */}
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-slate-300 animate-fade-in-up">
        Ketahui bagaimana kebiasaan media sosial mempengaruhi kualitas tidur Anda dengan prediksi berbasis AI.
      </p>
      
      {/* Tombol Navigasi ke Halaman Formulir */}
      <Link
        to="/prediksi"
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/50"
      >
        Mulai Prediksi Sekarang
      </Link>
      
    </div>
  );
};

export default Homepage;