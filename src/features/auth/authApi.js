import { authAPiSlice } from "./authApiSlice";
import { getUser } from "./authSlice";

const authApi = authAPiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: "POST",
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getApplicantProfile: builder.query({
            query: (applicantId) => ({
                url: `/applicant/${applicantId}`,
                method: "GET",
            })
        })
    })
})

export const { useRegisterMutation, useGetApplicantProfileQuery } = authApi;