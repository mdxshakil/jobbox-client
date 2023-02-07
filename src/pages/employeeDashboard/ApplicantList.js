import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/reusable/Loading';
import { useJobByIdQuery } from '../../features/job/jobApi';

const ApplicantList = () => {
    // const { jobId } = useParams();
    const location = useLocation();
    const jobId =  location.search.split('=')[1];
    const navigate = useNavigate();
    const { data, isLoading } = useJobByIdQuery(jobId)
    const applicantList = data?.data?.applicants;

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='flex gap-5 p-5 items-center justify-center'>
            {
                applicantList.map(applicant =>
                    <div key={applicant.email}>
                        <div className='border border-gray-300 shadow-xl p-5 rounded-2xl bg-purple-200 flex items-center justify-center flex-col'>
                            <h1>{applicant.email}</h1>
                            <button onClick={() => navigate(`job-applicant-profile/${applicant.id}?jobId=${jobId}`)} className='btn'>See profile</button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default ApplicantList;