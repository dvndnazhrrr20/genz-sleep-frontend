import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { result } = location.state || {};

  // ===== TAMBAHAN: Menangani respons error dari backend =====
  if (result && result.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h2 className="text-3xl font-bold mb-4 text-red-400">Terjadi Error di Backend</h2>
        <p className="mb-8 text-slate-300">Server mengembalikan pesan error berikut:</p>
        <pre className="mb-8 text-slate-300 max-w-xl bg-slate-800 p-4 rounded whitespace-pre-wrap">
          <code>{result.error}</code>
        </pre>
        <Link
          to="/prediksi"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full text-lg"
        >
          Kembali ke Formulir
        </Link>
      </div>
    );
  }
  // =============================================================

  // Penjaga jika halaman diakses langsung (tetap ada)
  if (!result || !result.prediksi) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Hasil Prediksi Tidak Ditemukan</h2>
        <p className="mb-8">Silakan isi formulir terlebih dahulu untuk melihat hasil prediksi.</p>
        <Link
          to="/prediksi"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full text-lg"
        >
          Kembali ke Formulir
        </Link>
      </div>
    );
  }

  // Sisa kode yang sudah benar (untuk menampilkan hasil sukses)
  const isGood = result.prediksi === 'Baik';
  const borderColor = isGood ? 'border-green-500' : 'border-red-500';
  const textColor = isGood ? 'text-green-400' : 'text-red-400';

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 animate-fade-in">
      <div className={`bg-slate-800 p-8 rounded-lg shadow-lg border-t-4 ${borderColor}`}>
        <h2 className="text-center text-lg font-semibold text-slate-400 mb-2">
          --- HASIL PREDIKSI KUALITAS TIDUR ---
        </h2>
        <p className={`text-center text-6xl font-bold ${textColor}`}>
          {result.prediksi.toUpperCase()}
        </p>
        <p className="text-center text-slate-400 mt-2">
          Tingkat Keyakinan: <span className="font-bold text-white">{result.keyakinan}%</span>
        </p>
      </div>

      <div className="mt-8 bg-slate-800 p-8 rounded-lg shadow-lg">
        <h3 className={`text-3xl font-bold mb-3 ${textColor}`}>
          {result.pesan.judul}
        </h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {result.pesan.deskripsi}
        </p>
        
        {result.pesan.rekomendasi && result.pesan.rekomendasi.length > 0 && (
          <div className="space-y-4">
            {result.pesan.rekomendasi.map((item, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-300">{item.judul}</h4>
                <p className="text-sm text-slate-300 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-center mt-10">
          <Link to="/prediksi" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
            Coba Prediksi Lagi
          </Link>
      </div>
    </div>
  );
};

export default ResultsPage;