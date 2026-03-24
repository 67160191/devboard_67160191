import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // เพิ่ม pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  //แยก fetch ออกมาเป็น function (เพิ่มใหม่)
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
      setCurrentPage(1); // reset page ตอนโหลดไปหน้าแรก
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  // reset page เมื่อ search หรือ sort เปลี่ยน
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortOrder]);

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // เอาโพสต์มาเรียงลำดับ
  const sortedPosts = [...filtered].sort((a, b) =>
    sortOrder === "desc" ? b.id - a.id : a.id - b.id,
  );

  //  pagination logic (ตัดข้อมูลเป็นหน้า)
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          borderBottom: "2px solid #1e40af",
          display: "flex",
          color: "#2d3748",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
        {/* ปุ่มโหลดใหม่ */}
        <button
          onClick={fetchPosts}
          disabled={loading}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            cursor: "pointer",
            background: "#edf2f7",
            fontSize: "1rem",
          }}
        >
          {loading ? "กำลังโหลด...." : "🔄 โหลดใหม่"}
        </button>
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* sort post */}
      <button
        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        style={{
          marginBottom: "1rem",
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          border: "1px solid #cbd5e0",
          cursor: "pointer",
          background: "#edf2f7",
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* จำนวนโพสต์ */}
      <PostCount count={filtered.length} />

      {/* ถ้ายังไม่มีโพสต์ให้แสดง Skeleton */}
      {posts.length === 0 ? (
        [1, 2, 3].map((n) => <PostSkeleton key={n} />)
      ) : filtered.length === 0 ? (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      ) : (
        // เปลี่ยนจาก sortedPosts เป็น paginatedPosts
        paginatedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isFavorite={favorites.includes(post.id)}
            onToggleFavorite={() => onToggleFavorite(post.id)}
          />
        ))
      )}

      {/* pagination UI */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ← ก่อนหน้า
        </button>

        <span>
          หน้า {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

export default PostList;
