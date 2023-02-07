import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/reusable/JobCard";
import { sortByFirstAdded, sortByLastAdded } from "../../features/filter/filterSlice";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const { user: { email, _id } } = useSelector((state) => state.authReducer);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.filterReducer)
  let element = data?.data?.map(job => <JobCard key={job._id} job={job}>
    <button className="btn" onClick={() => navigate(`/dashboard/contact/${_id}?jobId=${job._id}`)}>Messages</button>
  </JobCard>)

  if (filter === 'lastAdded') {
    element = data?.data?.map(job => <JobCard key={job._id} job={job}>
      <button className="btn" onClick={() => navigate(`/dashboard/contact/${_id}?jobId=${job._id}`)}>Messages</button>
    </JobCard>).reverse() 
  }
  return (
    <div>
      <h1 className='text-xl py-5 text-center font-bold'>Applied jobs</h1>
      <div className="flex gap-4 p-5">
        <button onClick={() => dispatch(sortByFirstAdded('firstAdded'))} className="btn">Applied First</button>
        <button onClick={() => dispatch(sortByLastAdded('lastAdded'))} className="btn">Applied Last</button>
      </div>
      <div className='grid grid-cols-2 gap-5 p-5'>
        {
          element
        }
      </div>
    </div>
  );
};

export default AppliedJobs;
