import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import UserList from "./components/UserList";

function App() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }); // เก็บ id ที่ถูกใจ ไว้ใน localStorage

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={() => {}} /> {/* จะเชื่อมใน wk14 */}
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา  */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
