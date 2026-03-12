import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.style.backgroundColor = "#111827";
      document.body.style.color = "white";
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {

    if (dark) {

      document.body.style.backgroundColor = "#f3f4f6";
      document.body.style.color = "black";

      localStorage.setItem("theme", "light");

      setDark(false);

    } else {

      document.body.style.backgroundColor = "#111827";
      document.body.style.color = "white";

      localStorage.setItem("theme", "dark");

      setDark(true);
    }

  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "6px 12px",
        border: "1px solid gray",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}