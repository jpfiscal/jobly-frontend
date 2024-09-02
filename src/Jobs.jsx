import React, { useEffect, useState } from "react";
import JoblyApi from "./api/api";
import JobCard from "./JobCard";

function Jobs(){
    const [jobsList, setJobsList] = useState([]);

    useEffect(function getAllJobs(){
        async function getJobList(){
            try{
                const response = await JoblyApi.getAllJobs();
                setJobsList(response.jobs);
            }catch (err){
                console.error("Error fetching jobs", err);
            }
        }
        getJobList();
    },[]);
    return(
        <div className="JobsList">
            {jobsList.map(job => (
                <JobCard 
                    key={job.id}
                    jobId={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    company={job.companyName}
                />
            ))}
        </div>
    )
}

export default Jobs;