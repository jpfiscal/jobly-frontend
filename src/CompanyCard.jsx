import React from "react";
import "./CompanyCard.css";

function CompanyCard ({name, description, numEmployees, logoUrl}){
    return(
        <div className="CompanyCard">
            <h2>{name}</h2>
            <img src={logoUrl} alt={name + " logo"}/>
            <p><span># of Employees: </span>{numEmployees}</p>
            <p><span>Description: </span>{description}</p>
        </div>
    )
}

export default CompanyCard;