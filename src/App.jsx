import { Homepage, BlogContentPage, Contact } from "./pages";
import { Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
export default function App() {
  let { loading, data, error } = useFetch(
    "http://localhost:1337/api/blogs?populate=*"
  );
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error...</p>;
  }
  console.log(data);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage blogs={data ? data : ""} />}></Route>

        <Route
          path="/blog/:id"
          element={<BlogContentPage blogs={data ? data : ""} />}
        ></Route>
        <Route path="/kontak" element={<Contact />} />
      </Routes>
    </div>
  );
}
