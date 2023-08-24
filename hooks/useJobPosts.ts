import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FullJobPost } from '@/types/jobPost';

type Response = {
    data: FullJobPost[];
};

type ErrorResponse = AxiosError<{ message: string }>;
type CreateJobPostResponse = { data: FullJobPost };

enum JobPosts {
    List = 'jobs-list',
    Saved = 'saved-jobs',
    Owned = 'owned-jobs',
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