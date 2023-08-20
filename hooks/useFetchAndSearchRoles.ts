import { JobTitle } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const useFetchAndSearchJobTitles = (searchQuery?: string) =>
    useQuery<{ data: JobTitle[] }, AxiosError<{ message: string }>, JobTitle[]>(
        {
            queryKey: ['job-titles', searchQuery],
            queryFn: () =>
                axios.get('/api/job-titles', {
                    params: { search_query: searchQuery },
                }),
            select: (res) => res.data,
        }
    );

export default useFetchAndSearchJobTitles;
