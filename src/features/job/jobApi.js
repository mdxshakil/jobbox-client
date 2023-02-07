import { authAPiSlice } from "../auth/authApiSlice";

const jobApi = authAPiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/job',
                body: data
            }),
            invalidatesTags: ['jobs']
        }),
        getJobs: builder.query({
            query: () => ({
                method: "GET",
                url: '/jobs'
            }),
            providesTags: ['jobs']
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                method: "GET",
                url: `/applied-jobs/${email}`
            }),
            providesTags: ['jobs']
        }),
        jobById: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/job/${id}`
            }),
            providesTags: ['qna']
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: '/apply',
                body: data
            }),
            invalidatesTags: ['jobs']
        }),
        askQuestion: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: 'query',
                body: data
            }),
            invalidatesTags: ['qna']
        }),
        reply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/reply",
                body: data
            }),
            invalidatesTags: ['qna']
        }),
        closeJob: builder.mutation({
            query: (jobId) => ({
                url: '/closeJob',
                method: "PATCH",
                body: { jobId }
            })
        }),
        jobWithApplicants: builder.query({
            query: () => ({
                method: "GET",
                url: "job-applicants"
            })
        }),
        //conversation part
        employerMessage: builder.mutation({
            query: (data) => ({
                url: '/employer-message',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['qna']
        }),
        candidateMessage: builder.mutation({
            query: (data) => ({
                url: '/candidate-message',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['qna']
        })
    })
})

export const { usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useAskQuestionMutation, useReplyMutation, useCloseJobMutation, useJobWithApplicantsQuery, useEmployerMessageMutation, useCandidateMessageMutation } = jobApi;