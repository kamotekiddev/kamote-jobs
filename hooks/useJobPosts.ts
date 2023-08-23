import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FullJobPosts } from '@/types/jobPost';

type Response = {
    data: FullJobPosts[];
};

type ErrorResponse = { message: string };

export const useFetchJobPosts = () =>
    useQuery<Response, AxiosError<{ message: string }>, FullJobPosts[]>({
        queryKey: ['job-posts'],
        queryFn: () => axios.get('/api/job-posts'),
        select: (res) => res.data,
    });

export const useFetchSavedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPosts[]>({
        queryKey: ['job-posts'],
        queryFn: () => axios.get('/api/job-posts/saved'),
        select: (res) => res.data,
    });

export const useFetchOwnedJobPosts = () =>
    useQuery<Response, ErrorResponse, FullJobPosts[]>({
        queryKey: ['job-posts'],
        queryFn: () => axios.get('/api/job-posts/owned'),
        select: (res) => res.data,
    });

export const useSaveUnsavePost = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { data: FullJobPosts },
        AxiosError,
        {
            action: 'save' | 'unsave';
            postId: string;
        }
    >((data) => axios.put('/api/job-posts', data), {
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['job-posts'] }),
    });
};
