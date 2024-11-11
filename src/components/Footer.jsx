import React, { useState } from "react";

import emailjs from "emailjs-com";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp, // Menambahkan WhatsApp Icon
} from "react-icons/fa";

const Footer = () => {
  emailjs.init("KA1948RXTL38AVhqi"); //
  const [email, setEmail] = useState(""); // State untuk email input

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    // Kirim email dengan EmailJS
    emailjs
      .sendForm(
        "service_dfrrrjr", // Ganti dengan Service ID Anda
        "template_i70os3i", // Ganti dengan Template ID Anda
        e.target, // Form yang dikirim
        "KA1948RXTL38AVhqi" // Ganti dengan Public Key Anda
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Subscription successful! Thank you for subscribing.");
        },
        (error) => {
          console.log(error.text);
          alert("Oops! Something went wrong.");
        }
      );
  };

  return (
    <div className="w-full bg-black text-gray-300 py-8 px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {/* Form subscribe */}
        <div className="col-span-2 pt-2 md:pt-2">
          <p className="font-bold uppercase font-poppins">
            Ingin Mengetahui Hal-Hal Menarik?
          </p>
          <p className="py-4 font-poppins">
            Subscribe untuk berita, artikel seru, dan konten eksklusif yang
            hanya kami kirimkan langsung ke inbox Anda! Ayo, jangan sampai
            ketinggalan!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-2 bg-white text-black focus:outline-none font-poppins"
              type="email"
              name="user_email" // Nama field untuk email
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mengatur state email
            />
            <button type="submit" className="p-2 mb-2 bg-green-500">
              Berlangganan & Temukan Kejutan!
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="ml-10">
          <h6 className="font-bold uppercase py-2">Layanan</h6>
          <ul>
            <li className="py-1">Kelas IT</li>
            <li className="py-1">Artikel</li>
            <li className="py-1">Kontak kita</li>
            <li className="py-1">Portofolio saya</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="font-bold uppercase py-2">Ikuti Kami</h6>
          <div className="flex flex-wrap gap-7">
            <a
              href="https://wa.me/6287789035813?text=Halo,%20saya%20mau%20tanya%20tentang%20kursus%20online%20Anda."
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61568193251434"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/mseptiawannn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/mseptiawannn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://github.com/mseptiawan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCd8joNFsPLinipEjwYOLm_Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://github.com/mseptiawan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="ml-10 ">
          <h6 className="font-bold uppercase py-2">Kontak Kami</h6>
          <ul className="">
            <li className="py-1">Email: septiawantechnology@gmail.com</li>
            <li className="py-1">Telepon: +62877-8903-5813</li>
            <li className="py-1">
              Alamat: Jalan Komp Yuka, Sukamaju, Palembang, Indonesia{" "}
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center">
        <p>&copy; 2024 Septiawan Technology. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
