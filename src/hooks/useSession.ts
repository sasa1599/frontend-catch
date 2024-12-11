import { IUser } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const checkSession = async () => {
    try {
        // const res = await fetch("http://localhost:8001/api/customers/profile", {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/json",
        //       },
        //   });
        //   const result = await res.json();
        //   if (!res.ok) throw result;
      const res = await axios.get(
        "http://localhost:8001/api/customers/profile",
        { withCredentials: true, headers: {
            "Content-Type": "application/json",
          },}

      );

      const result = res.data;
      console.log(result, "session");
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return { isAuth, user, setIsAuth, setUser };
};

export default useSession;
