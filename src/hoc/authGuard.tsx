"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/context/useSession";  // Menggunakan useSession yang sudah ada
import { useRouter } from "next/navigation";

// Higher-Order Component untuk melindungi halaman yang memerlukan autentikasi
const authGuard = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  // Komponen yang akan dibungkus oleh HOC ini
  const AuthGuard: React.FC<P> = (props: P) => {
    const { isAuth, loading } = useSession(); // Mengambil status autentikasi dari context
    const router = useRouter();

    const [isTokenAvailable, setIsTokenAvailable] = useState<boolean>(false);

    useEffect(() => {
      // Mengecek apakah token ada di localStorage
      const token = localStorage.getItem("token");
      if (token) {
        setIsTokenAvailable(true);
      }

      // Jika tidak terautentikasi dan tidak ada token, arahkan ke halaman login
      if (!loading && !isAuth && !isTokenAvailable) {
        router.replace("/login");
      }
    }, [isAuth, loading, router, isTokenAvailable]);

    // Jika sedang memuat atau belum ada token, tampilkan loading
    if (loading || !isTokenAvailable) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
          <h1 className="text-3xl font-bold">Checking Authentication...</h1>
        </div>
      );
    }

    // Render komponen yang dibungkus jika sudah terautentikasi
    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};

export default authGuard;
