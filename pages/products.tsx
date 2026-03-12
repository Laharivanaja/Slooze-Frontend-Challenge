import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { products } from "../data/products";
import ThemeToggle from "../components/ThemeToggle";

export default function Products() {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login");
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
          Product Inventory
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

      {/* Products Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              {product.name}
            </h2>

            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>

          </div>

        ))}

      </div>

    </div>
  );
}