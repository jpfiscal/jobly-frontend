import React, { useState } from "react";
import "./SearchForm.css";
import JoblyApi from "./api/api";

function SearchForm({filter}){
    const [filterStr, setFilterStr] = useState("");
    const handleChange = (e) => {
        setFilterStr(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const response = await JoblyApi.findCompaniesByName(filterStr); 
           filter(response.companies);
        }catch (err){
            console.error("Cannot fetch filtered companies:", err);
        }
    }
    return (
        <form className="SearchForm" onSubmit={handleSubmit}>
            <input type="string" onChange={(handleChange)}></input>
            <button>Submit</button>
        </form>
    )
}
export default SearchForm;