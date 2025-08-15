const Footer = () => {
  return (
    <footer className="bg-slate-800/50 mt-12 py-6">
      <div className="container mx-auto text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} GenZ Sleep Prediction. Dibuat untuk Skripsi.</p>
        <p>Oleh: <span className="font-semibold text-slate-300">Diviandini Azzahra</span></p>
      </div>
    </footer>
  );
};

export default Footer;