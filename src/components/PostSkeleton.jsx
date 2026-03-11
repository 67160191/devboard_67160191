function PostSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          style={{
            background: "#e2e8f0",
            height: "12px",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        ></div>
      ))}
    </div>
  );
}

export default PostSkeleton;
