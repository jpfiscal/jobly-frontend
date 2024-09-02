import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({signup}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: '',
        password : '',
        firstName : '',
        lastName : '',
        email: ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData.username, formData.password, formData.firstName, formData.lastName, formData.email);
        setFormData(INITIAL_STATE);
        navigate("/"); //go to the homepage after submitting the signup form
    }
    return(
        <div className="SignupForm">
            <h2>Sign Up!</h2>
            <form onSubmit={handleSubmit}>
                <div className="InputGroup">
                    <label>Username: </label>
                    <input 
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Password: </label>
                    <input 
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>First Name: </label>
                    <input 
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Last Name: </label>
                    <input 
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Email: </label>
                    <input 
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />    
                </div>
                <button>Submit</button>
            </form>
        </div>   
    )
}

export default SignUpForm