import React, { useState, useEffect } from "react";
import JoblyApi from "./api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

function CompanyList(){
    const [companyList, setCompanyList] = useState([]);

    useEffect(function getAllCompanies() {
        async function getCompanyList() {
          try {
            const response = await JoblyApi.getAllCompanies();
            setCompanyList(response.companies);
            
          } catch (err) {
            console.error("Error fetching companies:", err);
          }
        }
        getCompanyList();
      }, []);
    
    return(
        <div className="Companies">
            <SearchForm filter={setCompanyList} />
            {companyList.length > 0 ? (
                companyList.map(company => (
                    <CompanyCard 
                        key={company.handle}
                        name={company.name}
                        description = {company.description}
                        numEmployees = {company.numEmployees}
                        logoUrl = {company.logoUrl}
                    />
            ))) : (
                <p>No companies found.</p>
            )}
        </div>
    )
}

export default CompanyList;