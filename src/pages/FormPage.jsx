import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const navigate = useNavigate();

  // State untuk menyimpan semua data dari form
  const [formData, setFormData] = useState({
    usia: 18,
    pola_waktu: 'Malam',
    jeda_tidur: '30 - 60 menit',
    fomo_scores: Array(10).fill(3), // Default semua jawaban FOMO ke 3 (Netral)
    durasi_app1: '01:30', // Default Instagram
    durasi_app2: '01:00', // Default TikTok
    durasi_app3: '00:30', // Default YouTube/Twitter
  });

  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Daftar pertanyaan FOMO
  const fomoQuestions = [
    'Saya khawatir orang lain memiliki pengalaman yang lebih berharga daripada saya.',
    'Saya khawatir teman-teman saya memiliki pengalaman yang lebih berharga daripada saya.',
    'Saya menjadi khawatir ketika saya tidak tahu apa yang teman-teman saya lakukan.',
    'Saya akan gelisah jika saya tidak tahu apa yang teman-teman saya perbincangkan.',
    'Penting bagi saya untuk memahami lelucon "orang dalam" dari teman-teman saya.',
    'Terkadang, saya bertanya-tanya apakah saya menghabiskan terlalu banyak waktu untuk mengikuti apa yang sedang terjadi.',
    'Mengganggu saya ketika saya melewatkan kesempatan untuk bertemu dengan teman-teman.',
    'Ketika saya bersenang-senang, penting bagi saya untuk membagikan detailnya secara online.',
    'Ketika saya melewatkan pertemuan yang direncanakan, saya merasa terganggu.',
    'Ketika saya pergi berlibur, saya terus memantau apa yang dilakukan teman-teman saya.',
  ];

  // Fungsi untuk menangani perubahan pada input biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi khusus untuk menangani perubahan pada skor FOMO
  const handleFomoChange = (index, value) => {
    const newFomoScores = [...formData.fomo_scores];
    newFomoScores[index] = parseInt(value, 10);
    setFormData((prev) => ({ ...prev, fomo_scores: newFomoScores }));
  };
  
  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/predict`;
      const response = await axios.post(apiUrl, formData);
      
      // Jika berhasil, pindah ke halaman hasil dan kirim data respons
      navigate('/hasil', { state: { result: response.data } });

    } catch (err) {
      setError('Gagal mengirim data. Pastikan backend Anda berjalan dan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">Formulir Prediksi Kualitas Tidur</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bagian 1: Data Diri & Kebiasaan */}
        <fieldset className="bg-slate-800 p-6 rounded-lg">
          <legend className="text-xl font-semibold px-2">Data Diri & Kebiasaan</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="usia" className="block mb-2">1. Usia Anda?</label>
              <input type="number" name="usia" id="usia" value={formData.usia} onChange={handleChange} min="13" max="27" required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="pola_waktu" className="block mb-2">2. Kapan Anda paling sering menggunakan media sosial?</label>
              <select name="pola_waktu" id="pola_waktu" value={formData.pola_waktu} onChange={handleChange} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                <option>Pagi</option>
                <option>Siang</option>
                <option>Malam</option>
                <option>Dini Hari</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="jeda_tidur" className="block mb-2">3. Berapa lama jeda antara menutup media sosial hingga mencoba tidur?</label>
              <select name="jeda_tidur" id="jeda_tidur" value={formData.jeda_tidur} onChange={handleChange} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                <option>Langsung tidur sambil membuka media sosial</option>
                <option>Kurang dari 30 menit</option>
                <option>30 - 60 menit</option>
                <option>lebih dari 60 menit</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Bagian 2: Kuesioner FOMO */}
        <fieldset className="bg-slate-800 p-6 rounded-lg">
          <legend className="text-xl font-semibold px-2">Kuesioner Singkat (Skala 1-5)</legend>
          <div className="space-y-4 mt-4">
            {fomoQuestions.map((question, index) => (
              <div key={index}>
                <label className="block mb-2">{`${index + 4}. ${question}`}</label>
                <select onChange={(e) => handleFomoChange(index, e.target.value)} value={formData.fomo_scores[index]} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                  <option value="1">1 - Sangat Tidak Setuju</option>
                  <option value="2">2 - Tidak Setuju</option>
                  <option value="3">3 - Netral</option>
                  <option value="4">4 - Setuju</option>
                  <option value="5">5 - Sangat Setuju</option>
                </select>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Bagian 3: Durasi Media Sosial */}
        <fieldset className="bg-slate-800 p-6 rounded-lg">
          <legend className="text-xl font-semibold px-2">Durasi Penggunaan Media Sosial (per hari)</legend>
          <p className="text-sm text-slate-400 mb-4">Masukkan perkiraan durasi dalam format Jam:Menit.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label htmlFor="durasi_app1" className="block mb-2">14. Instagram</label>
              <input type="time" name="durasi_app1" id="durasi_app1" value={formData.durasi_app1} onChange={handleChange} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="durasi_app2" className="block mb-2">15. TikTok</label>
              <input type="time" name="durasi_app2" id="durasi_app2" value={formData.durasi_app2} onChange={handleChange} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="durasi_app3" className="block mb-2">16. YouTube/Twitter</label>
              <input type="time" name="durasi_app3" id="durasi_app3" value={formData.durasi_app3} onChange={handleChange} required className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Tombol Submit */}
        <div className="text-center pt-4">
          <button type="submit" disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/50 disabled:bg-slate-600 disabled:shadow-none disabled:scale-100">
            {isLoading ? 'Menganalisis...' : 'Lihat Hasil Prediksi Saya'}
          </button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default FormPage;