import { Homepage, BlogContentPage, Contact } from "./pages";
import { Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import loadingAnimation from "../data/spin.json";
import Lottie from "react-lottie";

export default function App() {
  let { loading, data, error } = useFetch(
    "https://strapi-production-2b16.up.railway.app/api/blogs?populate=*"
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie
          options={{
            animationData: loadingAnimation,
            loop: true,
            autoplay: true,
          }}
          height={300}
          width={300}
        />
      </div>
    );
  }

  if (error) {
    return <p>Error...</p>;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Homepage blogs={data || { data: [] }} />}
        ></Route>
        <Route
          path="/blog/:id"
          element={<BlogContentPage blogs={data || { data: [] }} />}
        ></Route>
        <Route path="/kontak" element={<Contact />} />
      </Routes>
    </div>
  );
}
