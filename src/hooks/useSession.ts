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
    console.log(role, user, isAuth, "role")
    if (role=="customer"){
      try {
        const customerRes = await axios.get(
          "http://localhost:8001/api/customers/profile",
          {
            withCredentials: true,
          }
        );
        if (customerRes.data) {
          setUser(customerRes.data.user);
          setIsAuth(true);
          return;
        }
      } catch (err) {
        console.warn("No customer session found");
      }
    }
    if (role=="promotor"){
      try {
        const promotorRes = await axios.get(
          "http://localhost:8001/api/promotors/profile",
          {
            withCredentials: true,
          }
        );
        if (promotorRes.data) {
          setUser(promotorRes.data.user);
          setIsAuth(true);
          return;
        }
      } catch (err) {
        console.warn("No promotor session found");
      }
    }


    // Reset session if no valid session is found
    setUser(null);
    setRole(null);
    setIsAuth(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { isAuth, user, role, setIsAuth, setUser, setRole };
};

export default useSession;