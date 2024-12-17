"use client";

import { IUser } from "@/types/user";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SessionContextProps {
  isAuth: boolean;
  user: IUser | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IUser | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const checkSession = async () => {
    try {
      const role = await localStorage.getItem("role");
      let res: any = [];
      if (role === "customer") {
        res = await fetch("http://localhost:8001/api/customers/profile", {
          method: "GET",
          credentials: "include",
        });
      }
      if (role === "promotor") {
        res = await fetch("http://localhost:8001/api/promotors/profile", {
          method: "GET",
          credentials: "include",
        });
      }
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuth, user, setIsAuth, setUser }}>
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
