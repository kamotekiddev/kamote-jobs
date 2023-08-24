import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FullJobPosts } from '@/types/jobPost';

type Response = {
    data: FullJobPosts[];
};

type ErrorResponse = AxiosError<{ message: string }>;

enum JobPosts {
    List = 'jobs-list',
    Saved = 'saved-jobs',
    Owned = 'owned-jobs',
}

export const useFetchJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPosts[]>({
        queryKey: [JobPosts.List],
        queryFn: () => axios.get('/api/job-posts'),
        select: (res) => res.data,
    });

export const useFetchSavedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPosts[]>({
        queryKey: [JobPosts.Saved],
        queryFn: () => axios.get('/api/job-posts/saved'),
        select: (res) => res.data,
    });

export const useFetchOwnedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPosts[]>({
        queryKey: [JobPosts.Owned],
        queryFn: () => axios.get('/api/job-posts/owned'),
        select: (res) => res.data,
    });

export const useSaveUnsavePost = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { data: FullJobPosts },
        ErrorResponse,
        {
            action: 'save' | 'unsave';
            postId: string;
            userId: string;
        }
    >((data) => axios.put('/api/job-posts', data), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JobPosts.List] });
            queryClient.invalidateQueries({ queryKey: [JobPosts.Saved] });
        },
    });
};
