import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

function UserList() {
  // ดึงข้อมูล user จาก API แบบ Custom Hook
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/users");
  const users = data || [];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
