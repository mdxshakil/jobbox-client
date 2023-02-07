import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetApplicantProfileQuery } from '../../features/auth/authApi';

const ApplicantProfile = () => {
    const { applicantId } = useParams();
    const location = useLocation();
    const jobId = location.search.split("=")[1];
    const navigate = useNavigate();
    const { data } = useGetApplicantProfileQuery(applicantId)
    const { firstName, lastName, address, city, country, email, postcode, gender, _id } = data?.data || {};

    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <h2 className='text-2xl'>{firstName} {lastName}</h2>
            <small>{email}</small>
            <div className='flex gap-3'>
                <p>Address: {address}</p>
                <p>City: {city}</p>
            </div>
            <p>PostCode: {postcode}</p>
            <div>
                <p>Gender: {gender}</p>
                <p>Country: {country}</p>
            </div>
            <button className="btn" onClick={() => navigate(`/dashboard/contact/${_id}?jobId=${jobId}`)
            }>Contact</button>
        </div>
    )
}

export default ApplicantProfile;