import React, { useState, useEffect } from "react";
import userComments from "/user-profile-icon.svg";

import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import photoauthor from "/writer-blogger-author-icon.svg";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BlogContent = ({ blogs }) => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [editComment, setEditComment] = useState(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(
          `http://localhost:1337/api/comments?filters[article][$eq]=${id}`
        );
        console.log(commentsResponse.data.data);
        setComments(commentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Komentar tidak boleh kosong!");
      return;
    }

    if (!userName.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    try {
      if (editComment) {
        const response = await axios.put(
          `http://localhost:1337/api/comments/${editComment.documentId}`,
          {
            data: {
              content: newComment,
              article: id,
              author: userName,
              comment_date: new Date().toISOString(),
            },
          }
        );

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.documentId === editComment.documentId
              ? response.data.data
              : comment
          )
        );
        setEditComment(null);
      } else {
        const response = await axios.post(
          "http://localhost:1337/api/comments",
          {
            data: {
              content: newComment,
              article: id,
              author: userName,
              comment_date: new Date().toISOString(),
            },
          }
        );

        setComments((prevComments) => [...prevComments, response.data.data]);
      }

      setNewComment("");
      setUserName("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/comments/${documentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.documentId !== documentId)
      );
      if (editComment && editComment.documentId === documentId) {
        setEditComment(null);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const blog = blogs?.data?.find((blog) => blog.id == id);
  console.log(blog);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pb-10 bg-white mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 ss:grid-cols-1 gap-x-8 gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black">
          <div className="col-span-2 gap-x-8 gap-y-8 rounded-xl">
            {blog.cover_image && blog.cover_image[0] ? (
              <img
                className="sm:h-[330px] ss:mt-0 xs:mt-20 xs:h-[200px] w-full object-scale-down"
                src={`http://localhost:1337${blog.cover_image[0]?.url}`}
                alt="Blog"
              />
            ) : (
              <div className="w-full h-[330px] bg-gray-300">No Image</div>
            )}

            <h1 className="font-bold text-4xl my-1 pt-5">{blog.title}</h1>
            <h6 className="font-extralight text-lg">{blog.published_date}</h6>

            <div className="pt-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="markdown-body"
              >
                {blog.content || "No content available"}
              </ReactMarkdown>
            </div>
          </div>

          <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 ss:col-span-1 bg-white rounded-xl p-6 drop-shadow-md py-5 max-h-[450px] xs:hidden md:block">
            <div className="text-center">
              <img
                className="p-2 w-32 h-18 rounded-xs mx-auto"
                src={photoauthor}
                alt="Author"
              />
              <h1 className="m-8 font-bold text-2xl text-center text-gray-900 pt-3">
                {blog.author?.name || "Unknown Author"}
              </h1>
              <p className="text-center text-xl text-gray-900 ">
                {blog.author?.bio || "No bio available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmitComment}
        className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-2 mt-8"
      >
        <input
          type="text"
          placeholder="Masukkan nama"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-4 p-4 border focus:outline-none focus:ring-2  border-gray-300 rounded-lg focus:ring-green-500"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-green-500   border-gray-300 rounded-lg"
          placeholder="Tulis komentar Anda..."
          rows="4"
        />
        <button
          type="submit"
          className="mt-4 p-2  bg-green-500 hover:bg-green-500 hover:text-white hover:scale-95 text-white rounded-lg"
        >
          {editComment ? "Perbarui Komentar" : "Kirim Komentar"}
        </button>
      </form>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-2 mt-8">
        <h2 className="text-3xl font-bold mb-4">Komentar</h2>
        {comments.length === 0 ? (
          <p>
            Belum ada komentar. Jadilah yang pertama untuk memberi komentar!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.documentId} className=" xs:p-2 ss:p-10 mt-12 ">
              {" "}
              <div className="flex justify-between">
                <div className="flex">
                  <img
                    src={userComments}
                    alt="Avatar"
                    className="w-14 -mt-4 "
                  />
                  <p className="text-xl xs:ml-2 ss:ml-10 -mt-6">
                    <strong>{comment.author || "Anonim"}</strong>
                  </p>
                  <p className="xs:ml-2 ss:ml-10  -mt-6">
                    {comment.comment_date
                      ? format(new Date(comment.comment_date), "dd MMM yyyy")
                      : ""}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <FaEdit
                    onClick={() => {
                      setEditComment(comment);
                      setNewComment(comment.content);
                      setUserName(comment.author);
                    }}
                    className="cursor-pointer text-blue-500"
                  />
                  <FaTrashAlt
                    onClick={() => handleDeleteComment(comment.documentId)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              </div>
              <div className="xs:ml-16 ss:ml-24 -mt-8">{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogContent;
