import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DaftarPenulis = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/authors?populate=articles"
        );
        console.log(response.data);
        setAuthors(response.data.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/authors/${documentId}`);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.documentId !== documentId)
      );
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleAddAuthor = () => {
    navigate("/add-author");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-40 px-4 sm:px-8 md:px-16 lg:px-2 mb-20">
      <h1 className="text-3xl font-bold mb-4">Daftar Penulis</h1>

      <button
        onClick={handleAddAuthor}
        className="m-4 p-2 mb-8 bg-green-500 hover:bg-green-500 hover:text-white hover:scale-95"
      >
        Tambah Penulis
      </button>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Bio</th>
            <th className="px-4 py-2 ss:block xs:hidden">Artikel</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author, index) => (
              <tr key={author.documentId} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{author.name}</td>
                <td className="px-4 py-2">{author.bio}</td>
                <td className="px-4 py-2 ss:block xs:hidden ">
                  {author.articles && author.articles.length > 0 ? (
                    author.articles.map((article) => (
                      <div key={article.id}>{" * " + article.title}</div>
                    ))
                  ) : (
                    <span>Belum ada artikel</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/edit-author/${author.documentId}`)
                    }
                    className="mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteAuthor(author.documentId)}
                    className=""
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                Tidak ada penulis.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarPenulis;
