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

type FetchMyJobApplicationsParams = {
    status?: string;
    initialData: FullJobApplication[];
};

export const useFetchMyJobApplications = ({
    status,
    initialData,
}: FetchMyJobApplicationsParams) =>
    useQuery<
        GetMyJobApplicationsResponse,
        AxiosError<{ message: string }>,
        FullJobApplication[]
    >({
        queryKey: [JobApplcationQueryKey.many, status],
        queryFn: () =>
            axios.get('/api/job-applications', { params: { status } }),
        select: (res) => res.data,
        ...(status === 'all' && { initialData: { data: initialData } }),
    });

export const useCreateJobApplication = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<Response, AxiosError, { data: T; id: string }>(
        ({ id, data }) => axios.post(`/api/job-posts/${id}/apply`, data),
        {
            onSettled: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.single] }),
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
                queryClient.invalidateQueries({ queryKey: [JobPosts.single] }),
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
                queryClient.invalidateQueries({ queryKey: [JobPosts.single] }),
        }
    );
};
