import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({login}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: '',
        password : ''
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
        login(formData.username, formData.password);
        setFormData(INITIAL_STATE);
        navigate("/"); //go back to the homepage after submitting the login form
    }
    return(
        <div className="LoginForm">
            <h2>Login</h2>
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
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )
}

export default LoginForm;