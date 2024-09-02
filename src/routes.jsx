import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./Companies";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({login, signup, updateUser}) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
            <Route path="/companies/:id" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/login" element={<LoginForm login={login}/>} />
            <Route path="/signup" element={<SignUpForm signup={signup} />} />
            <Route path="/profile" element={<ProtectedRoute><ProfileForm updateUser={updateUser}/></ProtectedRoute>} />
        </Routes>
    )
}

export default AppRoutes;