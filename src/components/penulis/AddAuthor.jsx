import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddAuthor = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const navigate = useNavigate();
  const { documentId } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/articles");
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (documentId) {
      const fetchAuthor = async () => {
        setLoadingAuthor(true);
        try {
          const response = await axios.get(
            `http://localhost:1337/api/authors/${documentId}`
          );
          const author = response.data.data;
          setName(author.name);
          setBio(author.bio);
          setSelectedArticles(
            author.articles
              ? author.articles.map((article) => article.documentId)
              : []
          );
        } catch (error) {
          console.error("Error fetching author:", error);
        } finally {
          setLoadingAuthor(false);
        }
      };
      fetchAuthor();
    }
  }, [documentId]);

  const handleNameChange = (e) => setName(e.target.value);

  const handleBioChange = (e) => setBio(e.target.value);

  const handleArticleChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedArticles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const authorData = {
      name: name,
      bio: bio,
      articles: selectedArticles,
    };

    try {
      if (documentId) {
        await axios.put(`http://localhost:1337/api/authors/${documentId}`, {
          data: authorData,
        });
      } else {
        await axios.post("http://localhost:1337/api/authors", {
          data: authorData,
        });
      }
      navigate("/daftarpenulis");
    } catch (error) {
      console.error("Error saving author:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuthor) {
    return <div>Loading author data...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-48 px-4 sm:px-8 md:px-16 lg:px-2 h-[700px]">
      <h1 className="text-3xl font-bold mb-4">
        {documentId ? "Edit Penulis" : "Tambah Penulis"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Nama Penulis
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan nama penulis"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Bio Penulis
          </label>
          <textarea
            value={bio}
            onChange={handleBioChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan bio penulis"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Pilih Artikel
          </label>
          <select
            multiple
            value={selectedArticles}
            onChange={handleArticleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Pilih Artikel (Opsional)</option>
            {articles.map((article) => (
              <option key={article.documentId} value={article.documentId}>
                {article.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 hover:text-white rounded-lg"
        >
          {loading
            ? documentId
              ? "Mengupdate..."
              : "Menambahkan..."
            : documentId
              ? "Perbarui Penulis"
              : "Tambah Penulis"}
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
