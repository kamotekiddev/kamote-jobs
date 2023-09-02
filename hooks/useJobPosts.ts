import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FullJobPost, JobPostListItem } from '@/types/jobPost';

type GetJobPostsResponse = { data: JobPostListItem[] };
type ErrorResponse = AxiosError<{ message: string }>;
type CreateJobPostResponse = { data: JobPostListItem };
type GetJobPostByIdParams = { id: string; data: FullJobPost };

export enum JobPosts {
    multiple = 'jobs-list',
    saved = 'saved-jobs',
    owned = 'owned-jobs',
    single = 'job-post',
}

type FetchJobPostsParams = {
    searchQuery?: string;
    initialData: JobPostListItem[];
};
export const useFetchJobPosts = ({
    searchQuery,
    initialData,
}: FetchJobPostsParams) =>
    useQuery<GetJobPostsResponse, ErrorResponse, JobPostListItem[]>({
        queryKey: [JobPosts.multiple, searchQuery],
        queryFn: () =>
            axios.get('/api/job-posts', {
                params: { search_query: searchQuery },
            }),
        select: (res) => res.data,
        initialData: { data: initialData },
    });

export const useFetchSavedJobPosts = () =>
    useQuery<GetJobPostsResponse, ErrorResponse, JobPostListItem[]>({
        queryKey: [JobPosts.saved],
        queryFn: () => axios.get('/api/job-posts/saved'),
        select: (res) => res.data,
    });

export const useFetchOwnedJobPosts = () =>
    useQuery<GetJobPostsResponse, ErrorResponse, JobPostListItem[]>({
        queryKey: [JobPosts.owned],
        queryFn: () => axios.get('/api/job-posts/owned'),
        select: (res) => res.data,
    });

export const useFetchJobpostById = ({ id, data }: GetJobPostByIdParams) =>
    useQuery<{ data: FullJobPost }, AxiosError, FullJobPost>({
        queryKey: [JobPosts.single, id],
        queryFn: () => axios.get(`/api/job-posts/${id}`),
        select: (res) => res.data,
        enabled: !!id,
        initialData: { data },
    });

export const useSaveUnsavePost = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { data: JobPostListItem },
        ErrorResponse,
        {
            action: 'save' | 'unsave';
            postId: string;
        }
    >((data) => axios.put('/api/job-posts', data), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JobPosts.multiple] });
            queryClient.invalidateQueries({ queryKey: [JobPosts.saved] });
            queryClient.invalidateQueries({ queryKey: [JobPosts.single] });
        },
    });
};

export const useCreateJobPost = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<CreateJobPostResponse, Error, T>(
        (data) => axios.post('/api/job-posts', data),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({ queryKey: [JobPosts.owned] }),
        }
    );
};

export const useUpdateHiringStatus = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<CreateJobPostResponse, Error, string>(
        (jobpostId) =>
            axios.put(`/api/job-posts/${jobpostId}/update-hiring-status`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [JobPosts.owned] });
                queryClient.invalidateQueries({ queryKey: [JobPosts.single] });
            },
        }
    );
};
