import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRole, children }) {

    const [status, setStatus] = useState("checking");

    useEffect(() => {

        const checkSession = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8080/api/auth/me",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    setStatus("unauthenticated");
                    return;
                }

                const user = await response.json();

                if (user.role !== allowedRole) {
                    setStatus("unauthorized");
                    return;
                }

                setStatus("authenticated");

            } catch (error) {

                console.error("Session check failed:", error);
                setStatus("unauthenticated");
            }
        };

        checkSession();

    }, [allowedRole]);


    if (status === "checking") {
        return <p>Checking session...</p>;
    }

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    if (status === "unauthorized") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;