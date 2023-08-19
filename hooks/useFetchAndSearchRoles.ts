import { JobRole } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const useFetchAndSearchRoles = (searchQuery?: string) =>
    useQuery<{ data: JobRole[] }, AxiosError<{ message: string }>, JobRole[]>({
        queryKey: ['job-roles', searchQuery],
        queryFn: () =>
            axios.get('/api/job-roles', {
                params: { search_query: searchQuery },
            }),
        select: (res) => res.data,
    });

export default useFetchAndSearchRoles;
