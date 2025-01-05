"use client";

import { useSession } from "@/context/useSession"; // Import from context
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify"; // Import toastify

const dashCustGuard = (WrappedComponent: React.ComponentType) => {
  const BookCustGuard: React.FC = (props) => {
    const { user, isAuth, loading } = useSession(); // Use session from context
    const router = useRouter();

    useEffect(() => {
      if (loading) return; // Wait for session to load

      if (!isAuth) {
        router.push("/"); // Redirect if not authenticated
      } else {
        // Get the role from localStorage
        const role = localStorage.getItem("role");

        // Check if the role is 'customer'
        if (role !== "customer") {
          toast.error("Promotor do not have access to this page!"); // Show red toast for error
          router.push("/"); // Redirect if role is not 'customer'
        }
      }
    }, [loading, isAuth, user, router]);

    // Show loading spinner or message if the session is still loading or there's no user
    if (loading || !isAuth || !user) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <p>Loading...</p>
        </div>
      );
    }

    // Render the component wrapped by the guard if the session is valid and the user is a customer
    return <WrappedComponent {...props} />;
  };

  return BookCustGuard;
};

export default dashCustGuard;
