import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList({ posts }) {
  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* จำนวนโพสต์ */}
      <PostCount count={posts.length} />

      {/* ถ้ายังไม่มีโพสต์ให้แสดง Skeleton */}
      {posts.length === 0
        ? [1, 2, 3].map((n) => <PostSkeleton key={n} />)
        : posts.map((post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
          ))}
    </div>
  );
}

export default PostList;
