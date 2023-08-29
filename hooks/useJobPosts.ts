import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FullJobPost } from '@/types/jobPost';

type Response = {
    data: FullJobPost[];
};

type ErrorResponse = AxiosError<{ message: string }>;
type CreateJobPostResponse = { data: FullJobPost };
type GetJobPostByIdParams = { id: string; data: FullJobPost };

export enum JobPosts {
    List = 'jobs-list',
    Saved = 'saved-jobs',
    Owned = 'owned-jobs',
    Post = 'job-post',
}

export const useFetchJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPost[]>({
        queryKey: [JobPosts.List],
        queryFn: () => axios.get('/api/job-posts'),
        select: (res) => res.data,
    });

export const useFetchSavedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPost[]>({
        queryKey: [JobPosts.Saved],
        queryFn: () => axios.get('/api/job-posts/saved'),
        select: (res) => res.data,
    });

export const useFetchOwnedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPost[]>({
        queryKey: [JobPosts.Owned],
        queryFn: () => axios.get('/api/job-posts/owned'),
        select: (res) => res.data,
    });

export const useFetchJobpostById = ({ id, data }: GetJobPostByIdParams) =>
    useQuery<{ data: FullJobPost }, AxiosError, FullJobPost>({
        queryKey: [JobPosts.Post, id],
        queryFn: () => axios.get(`/api/job-posts/${id}`),
        select: (res) => res.data,
        enabled: !!id,
        initialData: { data },
    });

export const useSaveUnsavePost = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { data: FullJobPost },
        ErrorResponse,
        {
            action: 'save' | 'unsave';
            postId: string;
        }
    >((data) => axios.put('/api/job-posts', data), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JobPosts.List] });
            queryClient.invalidateQueries({ queryKey: [JobPosts.Saved] });
            queryClient.invalidateQueries({ queryKey: [JobPosts.Post] });
        },
    });
};

export const useCreateJobPost = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<CreateJobPostResponse, Error, T>(
        (data) => axios.post('/api/job-posts', data),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.Owned] }),
        }
    );
};

export const useUpdateJobPost = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<
        CreateJobPostResponse,
        Error,
        { jobPostId: string; data: T }
    >(
        ({ jobPostId, data }) =>
            axios.post(`/api/job-posts/${jobPostId}`, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [JobPosts.Owned] });
                queryClient.invalidateQueries({ queryKey: [JobPosts.Post] });
            },
        }
    );
};
