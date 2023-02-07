import React from 'react'
import { useJobWithApplicantsQuery } from '../../features/job/jobApi'
import JobApplicantCard from './JobApplicantCard';

const AppliedJobList = () => {
    const { data, isLoading } = useJobWithApplicantsQuery();
    
    return (
        <div className='p-5'>
            {
                data?.map(job => <JobApplicantCard key={job._id} job={job}></JobApplicantCard>)
            }
        </div>
    )
}

export default AppliedJobList;