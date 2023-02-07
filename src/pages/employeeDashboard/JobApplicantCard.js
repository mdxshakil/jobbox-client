import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobApplicantCard = ({ job }) => {
    const navigate = useNavigate();
    const { position, companyName, location, applicants, _id } = job
    return (
        <div
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
        >
            <div className='flex justify-between  text-primary'>
                <div>
                    <p className='text-xl'>{position}</p>
                    <small className='text-primary/70 '>
                        by{" "}
                        <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                            {companyName}
                        </span>
                    </small>
                </div>
                <p>{location}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
                <p>Total Applicants: {applicants.length}</p>
                <button className='btn' onClick={() => navigate(`job-applicant-list?jobId=${_id}`)}>
                    Applicants
                </button>
            </div>
        </div>
    )
}

export default JobApplicantCard