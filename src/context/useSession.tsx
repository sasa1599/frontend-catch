// useSession.tsx atau context/useSession.tsx

"use client";

import { IPromotor, IUser } from "@/types/user";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SessionContextProps {
  isAuth: boolean;
  user: IUser | IPromotor | null;
  loading: boolean; // Menambahkan loading di sini
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IUser | IPromotor | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | IPromotor | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State loading

  const checkSession = async () => {
    try {
      const role = localStorage.getItem("role");
      let res: Response;

      if (role === "customer") {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_BE}/customers/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (role === "promotor") {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_BE}/promotors/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        throw new Error("Invalid role");
      }

      const result: { user: IUser | IPromotor } = await res.json(); // Tambahkan tipe hasil respons sesuai data API
      if (!res.ok) throw result;

      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading selesai setelah proses selesai
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ isAuth, user, loading, setIsAuth, setUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
