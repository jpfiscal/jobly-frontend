import React, {useState, useContext, useEffect} from "react"
import "./JobCard.css"
import userContext from "./userContext";
import JoblyApi from "./api/api";

function JobCard({jobId, title, salary, equity, company}){
    const currentUser = useContext(userContext);
    const [applied, setApplied] = useState(false);
    const displayEquity = (equity) ? equity : "N/A"
    const displaySalary = (salary) ? "$" + salary : "N/A"
    useEffect(() => {
        async function fetchApplied(){
            try{
                const didApply = await JoblyApi.checkApplied(currentUser.username, jobId);
                setApplied(didApply.applied);
            }catch (err){
                console.error("Failed to get aplicaiton data:", err);
            }
        }
        fetchApplied();
    },[])
    async function applyToJob(){
        try{
            await JoblyApi.apply(currentUser.username, jobId)
            setApplied(true);
        }catch (err){
            console.error("Failed to apply to job:", err);
        }
    }

    return(
        <div className="JobCard">
            <h2>{title}</h2>
            <p><span>Company: </span>{ company }</p>
            <p><span>Salary: </span>{ displaySalary }</p>
            <p><span>Equity: </span>{ displayEquity }</p>
            <button onClick={applyToJob} disabled={applied}>Apply</button>
        </div>
    )
}

export default JobCard;