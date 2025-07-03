import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // ✅ Declare and use tokenFromUrl inside useEffect
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    console.log("URL token:", tokenFromUrl); // ✅ Safe here

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      // ✅ Clean the URL after saving token
      window.history.replaceState(null, null,"/");
    }

    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Stored token:", token); 

      if (!token) {
        window.location.href = "https://frontend-z.netlify.app";
        
        return;
      }

      try {
        const res = await fetch("https://backend-z-soz4.onrender.com/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log("Verify API response:", res.status, data);

        if (res.status === 200) {
          setIsVerified(true);
        } else {
          window.location.href = "https://frontend-z.netlify.app";
        }
      } catch (err) {
        console.error("Verification failed:", err);
        window.location.href = "https://frontend-z.netlify.app";
      }
    };

    verifyToken();
  }, []);

  if (!isVerified) return <p>Verifying user...</p>;

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
