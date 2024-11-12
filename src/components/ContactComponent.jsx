import React, { useState } from "react";
import emailjs from "emailjs-com"; // Mengimpor library emailjs-com

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Mengupdate state berdasarkan name dan value input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim email menggunakan EmailJS
    emailjs
      .sendForm(
        "service_dfrrrjr", // Ganti dengan Service ID dari EmailJS
        "template_nwfn9pp", // Ganti dengan Template ID dari EmailJS
        e.target, // Ambil data dari form yang disubmit
        "KA1948RXTL38AVhqi" // Ganti dengan Public Key dari EmailJS
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Terima kasih! Pesan Anda telah terkirim.");
        },
        (error) => {
          console.log(error.text);
          alert("Terjadi kesalahan. Pesan Anda gagal terkirim.");
        }
      );

    // Reset form setelah kirim
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full py-10 bg-white">
      <div className="max-w-[1240px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Kontak Kami
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mb-6">
            Jika Anda memiliki pertanyaan atau ingin berdiskusi lebih lanjut,
            silakan kirimkan pesan melalui formulir kontak di bawah ini.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name" // Pastikan `name` field ini sesuai dengan key state
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nama Anda"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" // Pastikan `name` field ini sesuai dengan key state
                value={formData.email}
                onChange={handleInputChange}
                className="p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Email Anda"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-700">
                Pesan
              </label>
              <textarea
                id="message"
                name="message" // Pastikan `name` field ini sesuai dengan key state
                value={formData.message}
                onChange={handleInputChange}
                className="p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="5"
                placeholder="Tulis pesan Anda..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-3 rounded-md w-full mt-4 hover:bg-green-600 transition duration-300"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Additional contact info */}
        <div className="mt-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Informasi Kontak
          </h1>
          <p className="text-gray-600 mb-2">
            Email:{" "}
            <a
              href="mailto:septiawantechnology@gmail.com"
              className="text-blue-500"
            >
              septiawantechnology@gmail.com
            </a>
          </p>
          <p className="text-gray-600 mb-2">Telepon: +6287789035813</p>
          <p className="text-gray-600 mb-2">
            Alamat: Jl. Sudarman Ganda Subrata, Sukamaju, Palembang, Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
