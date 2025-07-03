import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Apps from "./Apps";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get("https://backend-z-soz4.onrender.com/verify", {
          withCredentials: true,
        });

        if (data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isValid) {
    window.location.href = "https://frontend-z.netlify.app/login";
    return null;
  }

  return <Apps />;
};

export default App;
