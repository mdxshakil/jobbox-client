import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { useGetApplicantProfileQuery } from '../../features/auth/authApi';
import { useJobByIdQuery, useEmployerMessageMutation, useCandidateMessageMutation } from '../../features/job/jobApi';

const Conversation = () => {
    const location = useLocation();
    const jobId = location.search.split("=")[1];
    const { candidateId } = useParams();
    const { data: profile } = useGetApplicantProfileQuery(candidateId)
    const { firstName, lastName, email: candidateEmail } = profile?.data || {};
    const { register, handleSubmit, reset } = useForm();
    const { role, email, _id } = useSelector(state => state.authReducer.user)
    const { data } = useJobByIdQuery(jobId, { pollingInterval: 1000 });
    const { position, conversation } = data?.data || {};
    const [candidateMessage, setCandidateMessage] = useState('');
    // conversation
    const [sendEmployerMessage] = useEmployerMessageMutation();
    const [sendCandidateMessage] = useCandidateMessageMutation();
    const handleEmployerMessageSubmit = async (message) => {
        const data = {
            employerMessage: message.employerMessage,
            employerEmail: email,
            employerId: _id,
            candidateEmail,
            candidateId,
            jobId
        }
        await sendEmployerMessage(data);
        reset()
    }
    const handleCandidateMessageSubmit = () => {
        const data = {
            candidateMessage,
            candidateId
        }
        sendCandidateMessage(data);
    }
    return (
        <div>
            <div className='p-5'>
                <h1>Conversation with <span className='text-primary font-bold'>{firstName} {lastName}:</span> </h1>
                <h1>Job Title: <span className='text-primary font-bold'>{position}</span> </h1>
            </div>
            <div className='p-5'>
                {
                    conversation?.filter(c => (c.jobId === jobId && c.candidateId === candidateId)).map((message, index) =>
                        <div key={index}>
                            <p className={role === 'employer' && 'text-primary font-bold'}>{message.employerMessage}</p>
                            {
                                message?.candidateMessage?.map((c, index) =>
                                    <div key={index}>
                                        <p className={role === 'candidate' && 'text-primary font-bold'}>{c}</p>
                                    </div>
                                )
                            }
                        </div>)
                }
            </div>
            {/* candidate message */}
            {role === 'candidate' && conversation?.length &&
                <div>
                    <div className='flex gap-3 my-5'>
                        <input
                            placeholder='Type your message...'
                            type='text'
                            className='w-full'
                            onBlur={e => {
                                setCandidateMessage(e.target.value)
                                e.target.value = '';
                            }}
                        />
                        <button
                            className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                            type='submit'
                            onClick={() => handleCandidateMessageSubmit()}
                        >
                            <BsArrowRightShort size={30} />
                        </button>
                    </div>
                </div>}
            {
                role === 'candidate' && !conversation?.length &&
                <p>No message from employer</p>
            }
            {/* employer message */}
            {role === 'employer' &&
                <form onSubmit={handleSubmit(handleEmployerMessageSubmit)}>
                    <div className='flex gap-3 my-5'>
                        <input
                            placeholder='Type your message...'
                            type='text'
                            className='w-full'
                            {...register('employerMessage')}
                        />
                        <button
                            className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                            type='submit'
                        >
                            <BsArrowRightShort size={30} />
                        </button>
                    </div>
                </form>}
        </div>
    )
}

export default Conversation