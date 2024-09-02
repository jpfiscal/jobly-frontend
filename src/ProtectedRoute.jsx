import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const currentUser = JSON.parse(localStorage.getItem("currUser"));

    if (!currentUser){
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;