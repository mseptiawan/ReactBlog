import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Blogs = ({ blogs }) => {
  // State untuk menyimpan halaman yang sedang aktif
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6; // Jumlah blog yang ditampilkan per halaman

  // Menghitung indeks blog berdasarkan halaman dan jumlah per halaman
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.data.slice(indexOfFirstPost, indexOfLastPost);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  // Menghitung jumlah halaman yang diperlukan
  const totalPages = Math.ceil(blogs.data.length / postsPerPage);

  return (
    <div className="w-full bg-white py-[50px] mt-20">
      <div className="max-w-[1240px] mx-auto">
        <h2 className="text-center mb-4 font-poppins mx-auto text-3xl sm:text-4xl md:text-2xl lg:text-4xl font-semibold">
          Artikel
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-2 gap-8 px-4 text-black ">
          {/* Render blog yang sesuai dengan halaman saat ini */}
          {currentPosts.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <div className="xs:flex sm:block xs:h-[200px] sm:h-[600px] sm:hover:bg-white overflow-hidden sm:hover:shadow-2xl xs:drop-shadow-lg   sm:drop-shadow-lg  xs:bg-white sm:bg-white  ">
                {/* Gambar */}
                <img
                  className="xs:h-20 sm:h-56 xs:mt-4 xs:ml-5 sm:mt-0 sm:ml-0   sm:w-full xs:w-1/4 object-cover"
                  src={`http://localhost:1337${blog.cover_image[0].url}`}
                  alt={blog.title}
                />
                {/* Konten Teks */}
                <div className="sm:p-8 xs:p-2 xs:pl-4 sm:pl-8 ">
                  <h3 className="font-bold  sm:text-2xl xs:text-xs my-1">
                    {blog.title}
                  </h3>
                  <h6 className="font-extralight sm:text-lg xs:text-xs">
                    {blog.published_date}
                  </h6>
                  <div
                    className="content sm:text-lg xs:text-xs mt-4 "
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Stack spacing={2}>
            <Pagination
              // variant="outlined"
              shape="rounded"
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="black"
              size="large"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
