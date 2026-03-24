import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div style={{ maxWidth: "700px", margin: "4rem auto", padding: "0 1rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "4rem", color: "#e53e3e", margin: "0 0 1rem" }}>404</h1>
            <p style={{ color: "#4a5568", fontSize: "1.2rem", marginBottom: "2rem" }}>
                ไม่พบหน้าที่คุณต้องการ
            </p>
            <Link
                to="/"
                style={{
                    color: "#1e40af",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}
            >
                [← กลับหน้าหลัก]
            </Link>
        </div>
    );
}

export default NotFoundPage;
