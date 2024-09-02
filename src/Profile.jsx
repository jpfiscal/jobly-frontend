import React, { useState, useEffect, useContext } from "react"
import userContext from "./userContext";
import JoblyApi from "./api/api";

function ProfileForm({updateUser}){
    const currentUser = useContext(userContext);
    const [currUserData, setCurrUserData] = useState(null);
    const INITIAL_STATE = {
        firstName : "",
        lastName : "",
        password : currentUser.password,
        email: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        async function fetchUserData() {
          const currentUserData = await JoblyApi.findUserByName(currentUser.username);
          console.log(`CURRENT USER DATA: ${JSON.stringify(currentUserData)}`);
          setCurrUserData(currentUserData);
          setFormData({
            firstName: currentUserData.user.firstName,
            lastName: currentUserData.user.lastName,
            password: currentUserData.user.password,
            email: currentUserData.user.email
          });
        }
    
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(currentUser.username, formData.firstName, formData.lastName, formData.email);
        //maybe add a toastify message to confirm that the user details have been updated
    }
    
    return(
        <div className="Profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
            
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

export default ProfileForm;