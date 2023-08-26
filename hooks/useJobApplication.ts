import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { JobApplication } from '@prisma/client';

type Response = {
    data: JobApplication;
};

export const useCreateJobApplication = <T>() => {
    const queryClient = useQueryClient();
    return useMutation<Response, AxiosError, { data: T; id: string }>(
        ({ id, data }) => axios.post(`/api/job-posts/${id}/apply`, data),
        {
            onSettled: () =>
                queryClient.invalidateQueries({ queryKey: ['job-post'] }),
        }
    );
};
