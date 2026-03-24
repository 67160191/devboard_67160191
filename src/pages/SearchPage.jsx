import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    
    // แบบฟอร์มในหน้า Search
    const [inputValue, setInputValue] = useState(q);

    const { data: allPosts, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
    const posts = allPosts || [];

    // อัพเดตค่าใน input เมื่อ query url เปลี่ยน
    useEffect(() => {
        setInputValue(q);
    }, [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        // อัปเดต URL query parameter
        if (inputValue.trim()) {
            setSearchParams({ q: inputValue });
        } else {
            setSearchParams({});
        }
    };

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(q.toLowerCase()) || 
        post.body.toLowerCase().includes(q.toLowerCase())
    );

    if (loading) return <LoadingSpinner />;

    if (error)
        return (
            <div style={{ padding: "1.5rem", background: "#fff5f5", color: "#c53030", maxWidth: "700px", margin: "2rem auto" }}>
                เกิดข้อผิดพลาด: {error}
            </div>
        );

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
            <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
                ค้นหาโพสต์
            </h2>

            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", margin: "1.5rem 0" }}>
                <input
                    type="text"
                    placeholder="พิมพ์คำที่ต้องการค้นหา (เช่น react...)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "0.5rem 0.75rem",
                        border: "1px solid #cbd5e0",
                        borderRadius: "6px",
                        fontSize: "1rem"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1.5rem",
                        background: "#1e40af",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    ค้นหา
                </button>
            </form>

            <p style={{ color: "#718096", marginBottom: "1rem", fontWeight: "bold" }}>
                {q ? `ผลการค้นหาสำหรับ "${q}" (${filtered.length} รายการ)` : "พิมพ์คำค้นหาที่คุณต้องการด้านบน"}
            </p>

            {q && filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#718096" }}>
                    ไม่พบโพสต์ที่ตรงกับคำว่า "{q}"
                </div>
            ) : (
                filtered.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
}

export default SearchPage;
