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
      {/* Title */}
      <div
        style={{
          background: "#e2e8f0",
          height: "14px",
          width: "60%",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      />

      {/* Body line 1 */}
      <div
        style={{
          background: "#e2e8f0",
          height: "12px",
          width: "80%",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      />

      {/* Body line 2 */}
      <div
        style={{
          background: "#e2e8f0",
          height: "12px",
          width: "100%",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}

export default PostSkeleton;
