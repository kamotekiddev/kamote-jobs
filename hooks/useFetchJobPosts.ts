import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { FullJobPosts } from '@/types/jobPost';

type Response = {
    data: FullJobPosts[];
};

const useFetchJobPosts = () =>
    useQuery<Response, AxiosError<{ message: string }>, FullJobPosts[]>({
        queryKey: ['job-posts'],
        queryFn: () => axios.get('/api/job-posts'),
        select: (res) => res.data,
    });

export default useFetchJobPosts;
