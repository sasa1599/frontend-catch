import { IUser } from "@/types/user";
import { IPromotor } from "@/types/promotors";
import axios from "axios";
import { useEffect, useState } from "react";

type SessionData = {
  isAuth: boolean;
  user: IUser | IPromotor | null;
  role: "customer" | "promotor" | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IUser | IPromotor | null) => void;
  setRole: (role: "customer" | "promotor" | null) => void;
};

const useSession = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | IPromotor | null>(null);
  const [role, setRole] = useState<SessionData["role"]>(null);
  const checkSession = async () => {
    if (!role) {
      setIsAuth(false);
      setUser(null);
      return;
    }

    try {
      const endpoint =
        role === "customer"
          ? "http://localhost:8001/api/customers/profile"
          : "http://localhost:8001/api/promotors/profile";

      const response = await axios.get(endpoint, {
        withCredentials: true,
      });

      if (response.data) {
        setUser(response.data.user);
        setIsAuth(true);
      }
    } catch (err) {
      console.warn("No session found for role:",role)
      setIsAuth(false);
      setUser(null);
      setRole(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { isAuth, user, role, setIsAuth, setUser, setRole };
};

export default useSession;