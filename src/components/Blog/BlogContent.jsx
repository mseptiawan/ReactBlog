// import React from "react";
// import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import author from "../../../data/author.json";
// import remarkGfm from "remark-gfm";

// const BlogContent = ({ blogs }) => {
//   const { id } = useParams();

//   // Mencari blog berdasarkan ID
//   const blog = blogs.data.find((blog) => blog.id == id) || {};

//   return (
//     <div className="w-full pb-10 bg-white mt-10">
//       <div className="max-w-[1240px] mx-auto">
//         <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 ss:grid-cols-1 gap-x-8 gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black ">
//           {/* Konten Blog */}
//           <div className="col-span-2 gap-x-8 gap-y-8 rounded-xl">
//             <img
//               className="sm:h-[330px] ss:mt-0 xs:mt-20  xs:h-[200px]  w-full object-scale-down"
//               src={`http://localhost:1337${blog.cover_image?.[0]?.url}`}
//               alt="Blog"
//               //
//             />
//             <h1 className="font-bold text-4xl my-1 pt-5">{blog.title}</h1>
//             <h6 className="font-extralight text-lg">{blog.published_date}</h6>

//             <div className="pt-5">
//               <ReactMarkdown className="markdown-body">
//                 {blog.content}
//               </ReactMarkdown>
//             </div>
//           </div>

//           {/* Card Penulis */}
//           <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 ss:col-span-1 bg-white rounded-xl p-6 drop-shadow-md py-5 max-h-[450px] xs:hidden md:block">
//             <div className="text-center">
//               <img
//                 className="p-2 w-32 h-32 rounded-full mx-auto"
//                 src={`${author.author.img}`}
//                 alt="Author"
//               />
//               <h1 className="font-bold text-2xl text-center text-gray-900 pt-3">
//                 {author.author.name}
//               </h1>
//               <p className="text-center text-xl text-gray-900 text-justify">
//                 {author.author.bio}
//               </p>{" "}
//               <a
//                 href="https://example.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <p className="text-center text-blue-500 text-xl mt-4">
//                   lihat portofolio
//                 </p>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BlogContent;

import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import author from "../../../data/author.json";
import remarkGfm from "remark-gfm";

const BlogContent = ({ blogs }) => {
  const { id } = useParams();
  const baseUrl = "https://strapi-production-2b16.up.railway.app";
  window.scrollTo(0, 0);
  const blog = blogs?.data?.find((blog) => blog.id == id) || {};
  console.log("Cover image:", blog.cover_image[0].url);
  return (
    <div className="w-full pb-10 bg-white mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 ss:grid-cols-1 gap-x-8 gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black ">
          {/* Konten Blog */}
          <div className="col-span-2 gap-x-8 gap-y-8 rounded-xl">
            {blog.cover_image && blog.cover_image[0] ? (
              <img
                className="sm:h-[330px] ss:mt-0 xs:mt-20  xs:h-[200px]  w-full object-scale-down"
                src={`https://strapi-production-2b16.up.railway.app${blog.cover_image?.[0]?.url}`} 
                alt="Blog"
              />
            ) : (
              <div className="w-full h-[330px] bg-gray-300">No Image</div>
            )}

            <h1 className="font-bold text-4xl my-1 pt-5">{blog.title}</h1>
            <h6 className="font-extralight text-lg">{blog.published_date}</h6>

            <div className="pt-5">
              <ReactMarkdown className="markdown-body">
                {blog.content || "No content available"}
              </ReactMarkdown>
            </div>
          </div>

          {/* Card Penulis */}
          <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 ss:col-span-1 bg-white rounded-xl p-6 drop-shadow-md py-5 max-h-[450px] xs:hidden md:block">
            <div className="text-center">
              <img
                className="p-2 w-32 h-32 rounded-full mx-auto"
                src={author?.author?.img || "default-author.jpg"}
                alt="Author"
              />
              <h1 className="font-bold text-2xl text-center text-gray-900 pt-3">
                {author?.author?.name || "Unknown Author"}
              </h1>
              <p className="text-center text-xl text-gray-900 text-justify">
                {author?.author?.bio || "No bio available"}
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-center text-blue-500 text-xl mt-4">
                  lihat portofolio
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
