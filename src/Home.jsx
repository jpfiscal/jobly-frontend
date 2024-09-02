import React, { useContext } from "react"
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    const currentUser = useContext(userContext);
    const goToLogin = () => {navigate("/login")};
    const goToSignup = () => {navigate("/signup")};
    if(!currentUser){
        return(
            <div className="loggedOutHome">
                <h1>Jobly</h1>
                <h3>All the jobs in one, convenient place.</h3>
                <div className="loginSignupBtns">
                    <button onClick={goToLogin}>Log in</button>
                    <button onClick={goToSignup}>Sign Up</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="loggedInHome">
                <h1>Jobly</h1>
                <h3>All the jobs in one, convenient place.</h3>
                <h2>Welcome Back {currentUser.username}!</h2>
            </div>
        )
    }
    
}

export default Home;