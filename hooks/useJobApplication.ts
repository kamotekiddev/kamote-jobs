import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { JobApplication } from '@prisma/client';
import { JobPosts } from './useJobPosts';
import { FullJobApplication } from '@/types/job-application';

type Response = {
    data: JobApplication;
};

type GetMyJobApplicationsResponse = {
    data: FullJobApplication[];
};

enum JobApplcationQueryKey {
    single = 'single-job-post',
    many = 'many-job-post',
}

export const useFetchMyJobApplications = () =>
    useQuery<
        GetMyJobApplicationsResponse,
        AxiosError<{ message: string }>,
        FullJobApplication[]
    >({
        queryKey: [JobApplcationQueryKey.many],
        queryFn: () => axios.get('/api/job-applications'),
        select: (res) => res.data,
    });

export const useCreateJobApplication = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<Response, AxiosError, { data: T; id: string }>(
        ({ id, data }) => axios.post(`/api/job-posts/${id}/apply`, data),
        {
            onSettled: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.Post] }),
        }
    );
};

export const useCancelJobApplication = () => {
    const queryClient = useQueryClient();
    return useMutation<
        Response,
        AxiosError,
        { applicationId: string; jobId: string }
    >(
        ({ jobId, applicationId }) =>
            axios.delete(`/api/job-posts/${jobId}/cancel/${applicationId}`),
        {
            onSettled: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.Post] }),
        }
    );
};

export const useUpdateJobApplication = <T>() => {
    const queryClient = useQueryClient();

    return useMutation<
        Response,
        AxiosError,
        { jobId: string; applicationId: string; data: T }
    >(
        ({ jobId, applicationId, data }) =>
            axios.put(`/api/job-posts/${jobId}/update/${applicationId}`, data),
        {
            onSettled: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.Post] }),
        }
    );
};
