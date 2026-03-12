import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { products } from "../data/products";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login");
      return;
    }

    if (role !== "manager") {
      router.push("/products");
      return;
    }

    setAuthorized(true);

  }, []);

  if (!authorized) {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "Arial"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px"
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold"
          }}
        >
          Manager Dashboard
        </h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <ThemeToggle />

          <button
            onClick={logout}
            style={{
              padding: "6px 12px",
              border: "1px solid gray",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}
      >

        <div
          style={{
            background: "#dbeafe",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2>Total Products</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {totalProducts}
          </p>
        </div>

        <div
          style={{
            background: "#dcfce7",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2>Total Stock</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {totalStock}
          </p>
        </div>

      </div>

    </div>
  );
}