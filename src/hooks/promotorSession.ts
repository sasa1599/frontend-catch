import { useState, useEffect } from "react";
import axios from "axios";
import { IPromotor } from "@/types/user";


const useProSession = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IPromotor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkSession = async () => {
    
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8001/api/promotors/profile", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = res.data;
      console.log(result, "session");
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch session. Please log in.");
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { isAuth, user, loading, error, setIsAuth, setUser };
};

export default useProSession;
